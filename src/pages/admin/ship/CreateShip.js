import React, { useCallback, useEffect, useState } from "react";
import { InputForm, ButtonField, Loading } from "components";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { showModal } from "store/app/appSlice";
import withBase from "hocs/withBase";
import { apiCreateShip } from "apis/ship";

const CreateShip = ({ dispatch }) => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm();

  const handleCreateShip = async (data) => {
    dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
    const response = await apiCreateShip(data);
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
        <span>Tạo phí ship</span>
      </h1>
      <div className="p-4">
        <form onSubmit={handleSubmit(handleCreateShip)}>
          <div className="w-full my-6 flex gap-4">
            <InputForm
              label={"Tên tỉnh thành"}
              register={register}
              errors={errors}
              id="province"
              validate={{
                required: "Vui lòng nhập tên tỉnh thành",
              }}
              fullwidth
              placeholder="Vui lòng nhập tên tên tỉnh thành"
              style="flex-auto"
            />
            <InputForm
              label={"Phí ship"}
              register={register}
              errors={errors}
              id="price"
              validate={{
                required: "Vui lòng nhập phí ship",
              }}
              fullwidth
              placeholder="Vui lòng nhập phí ship"
              style="flex-auto"
              type="number"
            />
          </div>
          <div className="mt-8">
            <ButtonField type="submit">Tạo</ButtonField>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withBase(CreateShip);
