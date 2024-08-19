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
import { apiUpdateColor } from "apis/color";

const UpdateColor = ({ valueEdit, render, setValueEdit }) => {
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
      code: valueEdit?.code || "",
    });
  }, []);

  const handleUpdateColor = async (data) => {
    dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
    const response = await apiUpdateColor(data, valueEdit?._id);
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
        <span>Cập nhật màu sắc</span>
        <span
          className="text-main hover:underline cursor-pointer"
          onClick={() => setValueEdit(null)}
        >
          Hủy
        </span>
      </h1>
      <div className="p-4">
        <form onSubmit={handleSubmit(handleUpdateColor)}>
          <div className="w-full my-6 flex gap-4">
            <InputForm
              label={"Tên"}
              register={register}
              errors={errors}
              id="title"
              validate={{
                required: "Vui lòng nhập tên màu",
              }}
              fullwidth
              placeholder="Vui lòng nhập tên tên màu"
              style="flex-auto"
            />
            <InputForm
              label={"Chọn màu"}
              register={register}
              errors={errors}
              type="color"
              id="code"
              validate={{
                required: "Vui lòng chọn màu",
              }}
              placeholder="Vui lòng chọn màu"
              style="flex-auto"
              fullheight
            />
          </div>

          <div className="mt-8">
            <ButtonField type="submit">Cập nhật màu sắc</ButtonField>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateColor;
