import React, { useCallback, useEffect, useState } from "react";
import { InputForm, ButtonField, Loading, SelectField } from "components";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { showModal } from "store/app/appSlice";
import withBase from "hocs/withBase";
import { useSelector } from "react-redux";
import { apiCreateBrand } from "apis/brand";
import { getBase64 } from "utils/helpers";

const CreateBrand = ({ dispatch }) => {
  const { categories } = useSelector((state) => state?.app);
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

  const handleCreateBrand = async (data) => {
    const finalPayload = { ...data };
    const formData = new FormData();
    if (finalPayload.images) {
      formData.append("images", finalPayload.images[0]);
    }

    for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);

    dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
    const response = await apiCreateBrand(formData);
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
        <span>Tạo thương hiệu</span>
      </h1>
      <div className="p-4">
        <form onSubmit={handleSubmit(handleCreateBrand)}>
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
              options={categories?.map((el) => ({
                code: el._id,
                value: el.title,
              }))}
              register={register}
              style="flex-auto"
              id="category"
              validate={{ required: "Vui lòng chọn danh mục" }}
              errors={errors}
              fullwidth
            />
          </div>
          <div className="mt-8">
            <ButtonField type="submit">Tạo thương hiệu</ButtonField>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withBase(CreateBrand);
