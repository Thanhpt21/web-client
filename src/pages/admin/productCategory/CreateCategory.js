import React, { useCallback, useEffect, useState } from "react";
import { InputForm, ButtonField, Loading, DynamicInput } from "components";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { validate, getBase64 } from "utils/helpers";
import { toast } from "react-toastify";
import { FaRegTrashCan } from "react-icons/fa6";
import { showModal } from "store/app/appSlice";
import { apiCreateBlog } from "apis/blog";
import { apiCreateCategory } from "apis/category";
import { FaTrash } from "react-icons/fa";

const CreateCategory = () => {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm();

  const [preview, setPreview] = useState({
    images: null,
  });

  const handlePreview = async (file) => {
    const base64 = await getBase64(file);
    setPreview((prev) => ({ ...prev, images: base64 }));
  };

  useEffect(() => {
    handlePreview(watch("images")[0]);
  }, [watch("images")]);

  const handleCreateCategory = async (data) => {
    const finalPayload = { ...data };

    const formData = new FormData();
    if (finalPayload.images) {
      formData.append("images", finalPayload.images[0]);
    }

    for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);

    dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
    const response = await apiCreateCategory(formData);
    dispatch(showModal({ isShowModal: false, modalChildren: null }));

    if (response.success) {
      toast.success(response.message);
      reset();
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="w-full bg-white min-h-screen">
      <h1 className="h-[75px] flex justify-between items-center text-xl px-4 border-b">
        <span>Tạo danh mục</span>
      </h1>
      <div className="p-4">
        <form onSubmit={handleSubmit(handleCreateCategory)}>
          <div className="flex flex-col gap-2 ">
            <label className="" htmlFor="images">
              Upload ảnh
            </label>
            <input
              className="w-fit"
              type="file"
              id="images"
              {...register("images", { required: "Vui lòng chọn ảnh" })}
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
                required: "Vui lòng nhập tên danh mục sản phẩm",
              }}
              fullwidth
              placeholder="Vui lòng nhập tên danh mục sản phẩm"
              style="flex-auto"
            />
          </div>

          <div className="mt-8">
            <ButtonField type="submit">Tạo danh mục</ButtonField>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategory;
