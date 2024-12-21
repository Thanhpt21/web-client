import React, { useEffect, useState } from "react";
import { InputForm, ButtonField, Loading } from "components";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { getBase64 } from "utils/helpers";
import { toast } from "react-toastify";

import { showModal } from "store/app/appSlice";
import { apiUpdateCategory } from "apis/category";

const UpdateCategory = ({ valueEdit, render, setValueEdit }) => {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm();

  const [val, setVal] = useState([]);

  useEffect(() => {
    reset({
      title: valueEdit?.title || "",
    });
    setPreview({
      images: valueEdit?.images || "",
    });
  }, []);

  useEffect(() => {
    setVal(valueEdit?.brand);
  }, []);

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

  const handleUpdateCategory = async (data) => {
    const finalPayload = { ...data };
    finalPayload.images =
      data?.images?.length > 0 ? data.images[0] : preview.images;

    const formData = new FormData();

    for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);

    dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
    const response = await apiUpdateCategory(formData, valueEdit?._id);
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
      <h1 className="h-[75px] flex justify-between items-center text-xl px-4 border-b">
        <span>Cập nhật danh mục sản phẩm</span>
        <span
          className="text-main hover:underline cursor-pointer"
          onClick={() => setValueEdit(null)}
        >
          Hủy
        </span>
      </h1>
      <div className="p-4">
        <form onSubmit={handleSubmit(handleUpdateCategory)}>
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
              label={"Tên danh mục"}
              register={register}
              errors={errors}
              id="title"
              validate={{
                required: "Vui lòng nhập tên danh mục",
              }}
              fullwidth
              placeholder
              style="flex-auto"
            />
          </div>

          <div className="mt-8">
            <ButtonField type="submit">Cập nhật danh mục</ButtonField>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategory;
