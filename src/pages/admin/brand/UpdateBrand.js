import React, { useCallback, useEffect, useState } from "react";
import {
  InputForm,
  SelectField,
  ButtonField,
  MarkDownEditer,
  Loading,
} from "components";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { validate, getBase64 } from "utils/helpers";
import { toast } from "react-toastify";

import { showModal } from "store/app/appSlice";
import { apiUpdateBrand } from "apis/brand";
import { apigetAllCategories } from "apis";
import HeaderWithCancelButton from "components/admin/HeaderWithCancelButton";

const UpdateBrand = ({ valueEdit, render, setValueEdit }) => {
  console.log("check valueEdit", valueEdit);
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
    setValue,
  } = useForm();
  const [dataCate, setDataCate] = useState(null);

  const fetchCategory = async () => {
    const response = await apigetAllCategories();
    if (response.success) {
      setDataCate(response.categoryData);
    }
  };

  useEffect(() => {
    fetchCategory();
    if (valueEdit) {
      setValue("title", valueEdit?.title || "");
      setValue("category", valueEdit?.category?._id || "");
      setPreview({
        images: valueEdit?.images || "",
      });
    }
    setPreview({
      images: valueEdit?.images || "",
    });
  }, [valueEdit, setValue]);

  const [preview, setPreview] = useState({
    images: null,
  });
  const handlePreview = async (file) => {
    const base64 = await getBase64(file);
    setPreview((prev) => ({ ...prev, images: base64 }));
  };

  useEffect(() => {
    if (watch("images") instanceof FileList && watch("images").length > 0)
      handlePreview(watch("images")[0]);
  }, [watch("images")]);

  const handleUpdateBrand = async (data) => {
    const finalPayload = { ...data };
    finalPayload.images =
      data?.images?.length > 0 ? data.images[0] : preview.images;

    const formData = new FormData();

    for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);

    dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
    const response = await apiUpdateBrand(formData, valueEdit?._id);
    dispatch(showModal({ isShowModal: false, modalChildren: null }));

    if (response.success) {
      toast.success(response.message);
      render();
      setValueEdit(null);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="w-full ">
      <HeaderWithCancelButton
        title={"Cập nhật thương hiệu"}
        setValueEdit={setValueEdit}
      />

      <div className="p-4">
        <form onSubmit={handleSubmit(handleUpdateBrand)}>
          <div className="flex flex-col gap-2 ">
            <label className="" htmlFor="images">
              Upload ảnh
            </label>
            <input
              className="w-fit"
              type="file"
              id="images"
              {...register("images")}
            />
            {errors["images"] && (
              <small className="text-xs text-red-500">
                {errors["images"]?.message}
              </small>
            )}
          </div>
          {preview.images && (
            <div className="my-4">
              <img
                className="w-[100px] object-contain"
                src={preview.images}
                alt="images"
              />
            </div>
          )}
          <div className="w-full my-6 flex gap-4">
            <InputForm
              label={"Tên"}
              register={register}
              errors={errors}
              id="title"
              validate={{
                required: "Vui lòng nhập tên thương hiệu",
              }}
              fullwidth
              placeholder="Vui lòng nhập tên tên hiệu"
              style="flex-auto"
            />
            <SelectField
              label="Danh mục"
              options={dataCate?.map((el) => ({
                code: el._id,
                value: el.title,
              }))}
              register={register}
              style="flex-auto"
              id="category"
              validate={{ required: "Vui lòng chọn danh mục" }}
              errors={errors}
              fullwidth
              value={watch("category")}
              handleChange={(e) => setValue("category", e.target.value)}
            />
          </div>

          <div className="mt-8">
            <ButtonField type="submit">Cập nhật thương hiệu</ButtonField>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBrand;
