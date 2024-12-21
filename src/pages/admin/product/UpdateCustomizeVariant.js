import React, { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { InputForm, ButtonField, Loading, SelectField } from "components";
import { getBase64 } from "utils/helpers";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "store/app/appSlice";
import { apiUpdateVariant } from "apis";
import { getColor } from "store/product/productActions";
import { useLocation } from "react-router-dom";

const UpdateCustomizeVariant = ({ render, valueEdit, setValueEdit }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { colors } = useSelector((state) => state?.product);
  let arrayColors = colors?.map((obj) => ({
    title: obj.title,
    _id: obj._id,
  }));

  useEffect(() => {
    dispatch(getColor());
  }, []);

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      discount: 0,
      color: valueEdit?.color?._id || "",
      thumb: valueEdit?.thumb || "", // Đảm bảo giá trị không rỗng nếu đã có
      images: valueEdit?.images || [], // Tương tự với images
    },
  });

  useEffect(() => {
    if (valueEdit) {
      reset({
        title: valueEdit.title || "",
        price: valueEdit.price || 0,
        discount: valueEdit.discount || 0,
        color: valueEdit?.color?._id || "",
      });
      setPreview({
        thumb: valueEdit.thumb || "",
        images: valueEdit.images || [],
      });
    }
  }, [valueEdit, reset]);

  const [preview, setPreview] = useState({
    thumb: null,
    images: [],
  });
  const handlePreviewThumb = async (file) => {
    const base64Thumb = await getBase64(file);
    setPreview((prev) => ({ ...prev, thumb: base64Thumb }));
  };

  useEffect(() => {
    if (watch("thumb") instanceof FileList && watch("thumb").length > 0)
      handlePreviewThumb(watch("thumb")[0]);
  }, [watch("thumb")]);

  const handlePreviewImages = async (files) => {
    const imagesPreview = [];

    for (let file of files) {
      if (
        file.type !== "image/png" &&
        file.type !== "image/jpg" &&
        file.type !== "image/jpeg"
      ) {
        toast.warning("File không đúng định dạng");
        return;
      }
      const base64 = await getBase64(file);
      imagesPreview.push(base64);
    }

    setPreview((prev) => ({ ...prev, images: imagesPreview }));
  };

  useEffect(() => {
    if (watch("images") instanceof FileList && watch("images").length > 0) {
      handlePreviewImages(watch("images"));
    }
  }, [watch("images")]);

  // useEffect(() => {
  //   reset({
  //     title: variant?.title,
  //     price: variant?.price,
  //     color: variant?.color?._id,
  //   });
  // }, [variant]);

  const handleUpdateVariant = async (data) => {
    const formData = new FormData();

    for (let [key, value] of Object.entries(data)) {
      // Kiểm tra các trường đặc biệt và xử lý riêng
      switch (key) {
        case "thumb":
          if (value && value.length > 0) {
            formData.append("thumb", value[0]);
          } else {
            formData.append("thumb", preview.thumb);
          }
          break;
        case "images":
          if (value && value.length > 0) {
            for (let image of value) {
              formData.append("images", image);
            }
          } else {
            // Nếu không có giá trị mới, sử dụng giá trị cũ từ preview
            preview.images.forEach((image) => formData.append("images", image));
          }
          break;
        default:
          formData.append(key, value);
          break;
      }
    }

    dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
    const response = await apiUpdateVariant(
      formData,
      location.state._id,
      valueEdit.sku
    );
    dispatch(showModal({ isShowModal: false, modalChildren: null }));
    if (response.success) {
      toast.success(response.message);
      reset();
      setPreview({
        thumb: "",
        images: [],
      });
      render();
      setValueEdit(null);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 relative">
      <h1 className="h-[75px] flex justify-between items-center text-xl px-4 border-b">
        <span>Cập nhật biến thể</span>
        <span
          className="text-main hover:underline cursor-pointer"
          onClick={() => setValueEdit(null)}
        >
          Hủy
        </span>
      </h1>
      <div className="p-4">
        <form
          onSubmit={handleSubmit(handleUpdateVariant)}
          className=" w-full flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2 ">
            <label className="" htmlFor="thumb">
              Upload ảnh sản phẩm chính
            </label>
            <input
              className="w-fit"
              type="file"
              id="thumb"
              {...register("thumb", {
                required: valueEdit?.thumb ? false : "Vui lòng chọn ảnh chính",
              })}
            />
            {errors["thumb"] && (
              <small className="text-xs text-red-500">
                {errors["thumb"]?.message}
              </small>
            )}
          </div>
          {preview.thumb && (
            <div className="my-4">
              <img
                className="w-[100px] object-contain"
                src={preview.thumb}
                alt="thumb"
              />
            </div>
          )}

          <div className="flex flex-col gap-2 mt-8">
            <label className="" htmlFor="images">
              Upload các ảnh sản phẩm phụ
            </label>
            <input
              className="w-fit"
              type="file"
              id="images"
              multiple
              {...register("images", {
                required: valueEdit?.images.length
                  ? false
                  : "Vui lòng chọn các ảnh phụ khác",
              })}
            />
            {errors["images"] && (
              <small className="text-xs text-red-500">
                {errors["images"]?.message}
              </small>
            )}
          </div>
          {preview.images.length > 0 && (
            <div className="my-4 flex w-full gap-3 flex-wrap">
              {preview.images.map((el, index) => (
                <div key={index} className="w-fit relative group">
                  <img
                    className="w-[100px] object-contain"
                    src={el}
                    alt="images"
                  />
                </div>
              ))}
            </div>
          )}
          <div className="w-full my-6 flex gap-4">
            <InputForm
              label={"Tên sản phẩm"}
              register={register}
              errors={errors}
              id="title"
              fullwidth
              style="flex-1"
              validate={{
                required: "Vui lòng nhập Tên sản phẩm (biến thể)",
              }}
              placeholder="Vui lòng nhập Tên sản phẩm (biến thể)"
            />
            <SelectField
              label="Màu"
              options={arrayColors?.map((el) => ({
                code: el._id,
                value: el.title,
              }))}
              register={register}
              style="flex-1"
              id="color"
              validate={{ required: "Vui lòng chọn màu" }}
              errors={errors}
              fullwidth
            />
          </div>
          <div className="w-full my-6 flex gap-4">
            <InputForm
              label={"Giá"}
              register={register}
              errors={errors}
              id="price"
              validate={{
                required: "Vui lòng nhập giá (biến thể)",
              }}
              style="flex-auto"
              fullwidth
              placeholder="Vui lòng nhập giá (biến thể)"
              type="number"
            />
            <InputForm
              label={"Giá giảm"}
              register={register}
              errors={errors}
              id="discount"
              defaultValue={0}
              style="flex-auto"
              fullwidth
              placeholder="Vui lòng nhập giá giảm"
              type="number"
            />
          </div>

          <div className="mt-8">
            <ButtonField type="submit">Cập nhật biến thể</ButtonField>
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(UpdateCustomizeVariant);
