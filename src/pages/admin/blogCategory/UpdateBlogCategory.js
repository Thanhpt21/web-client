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
import { apiUpdateBlogCategory } from "apis/blogCategory";

const UpdateBlogCategory = ({ valueEdit, render, setValueEdit }) => {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm();

  useEffect(() => {
    reset({
      title: valueEdit?.title || "",
    });
  }, []);

  const handleUpdateBlogCategory = async (data) => {
    dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
    const response = await apiUpdateBlogCategory(data, valueEdit?._id);
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
        <span>Cập nhật danh mục tin tức</span>
        <span
          className="text-main hover:underline cursor-pointer"
          onClick={() => setValueEdit(null)}
        >
          Hủy
        </span>
      </h1>
      <div className="p-4">
        <form onSubmit={handleSubmit(handleUpdateBlogCategory)}>
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

export default UpdateBlogCategory;
