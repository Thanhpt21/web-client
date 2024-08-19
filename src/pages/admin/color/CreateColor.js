import React, { useCallback, useEffect, useState } from "react";
import { InputForm, ButtonField, Loading } from "components";
import { useForm } from "react-hook-form";
import { validate, getBase64 } from "utils/helpers";
import { toast } from "react-toastify";
import { FaRegTrashCan } from "react-icons/fa6";
import { showModal } from "store/app/appSlice";
import { apiCreateBlogCategory } from "apis/blogCategory";
import withBase from "hocs/withBase";
import { apiCreateColor } from "apis/color";

const CreateColor = ({ dispatch }) => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm();

  const handleCreateColor = async (data) => {
    dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
    const response = await apiCreateColor(data);
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
        <span>Tạo màu sắc</span>
      </h1>
      <div className="p-4">
        <form onSubmit={handleSubmit(handleCreateColor)}>
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
            <ButtonField type="submit">Tạo màu sắc</ButtonField>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withBase(CreateColor);
