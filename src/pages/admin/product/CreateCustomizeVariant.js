import React, { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { InputForm, ButtonField, Loading, SelectField } from "components";
import { getBase64 } from "utils/helpers";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "store/app/appSlice";
import { apiAddVariant } from "apis";

const CreateCustomizeVariant = ({ variant, setVariant, render }) => {
  const dispatch = useDispatch();
  const { colors } = useSelector((state) => state?.product);
  let arrayColors = colors?.map((obj) => ({
    title: obj.title,
    _id: obj._id,
  }));
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm();

  const [preview, setPreview] = useState({
    thumb: null,
    images: [],
  });
  const handlePreviewThumb = async (file) => {
    const base64Thumb = await getBase64(file);
    setPreview((prev) => ({ ...prev, thumb: base64Thumb }));
  };
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
    if (imagesPreview.length > 0) {
      setPreview((prev) => ({ ...prev, images: imagesPreview }));
    }
  };

  useEffect(() => {
    if (watch("thumb") instanceof FileList && watch("thumb").length > 0)
      handlePreviewThumb(watch("thumb")[0]);
  }, [watch("thumb")]);

  useEffect(() => {
    if (watch("images") instanceof FileList && watch("images").length > 0)
      handlePreviewImages(watch("images"));
  }, [watch("images")]);

  useEffect(() => {
    reset({
      title: variant?.title,
      price: variant?.price,
      color: variant?.color?._id,
    });
  }, [variant]);

  const handleAddVariant = async (data) => {
    if (data.color === variant.color) {
      Swal.fire("Opps!", "Màu chưa thay đổi", "info");
    } else {
      const formData = new FormData();
      for (let i of Object.entries(data)) formData.append(i[0], i[1]);
      if (data.thumb) {
        formData.append("thumb", data.thumb[0]);
      }
      if (data.images) {
        for (let image of data.images) formData.append("images", image);
      }
      dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
      const response = await apiAddVariant(formData, variant._id);
      dispatch(showModal({ isShowModal: false, modalChildren: null }));
      if (response.success) {
        toast.success(response.message);
        reset();
        setPreview({
          thumb: "",
          images: [],
        });
        render();
        setVariant(null);
      } else {
        toast.error(response.message);
      }
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 relative">
      <h1 className="h-[75px] flex justify-between items-center text-xl px-4 border-b">
        <span>Cập nhật biến thể</span>
        <span
          className="text-main hover:underline cursor-pointer"
          onClick={() => setVariant(null)}
        >
          Hủy
        </span>
      </h1>
      <div className="p-4">
        <form
          onSubmit={handleSubmit(handleAddVariant)}
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
              {...register("thumb", { required: "Vui lòng chọn ảnh chính" })}
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
                required: "Vui lòng chọn các ảnh phụ khác",
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
            <ButtonField type="submit">Thêm biến thể</ButtonField>
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(CreateCustomizeVariant);
