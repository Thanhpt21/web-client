import React, { useEffect } from "react";
import { InputForm, ButtonField, Loading } from "components";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { showModal } from "store/app/appSlice";
import { apiUpdateShip } from "apis/ship";

const UpdateShip = ({ valueEdit, render, setValueEdit }) => {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();

  useEffect(() => {
    reset({
      province: valueEdit?.province || "",
      price: valueEdit?.price || "",
    });
  }, []);

  const handleUpdateShip = async (data) => {
    dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
    const response = await apiUpdateShip(data, valueEdit?._id);
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
        <span>Cập nhật phí ship</span>
        <span
          className="text-main hover:underline cursor-pointer"
          onClick={() => setValueEdit(null)}
        >
          Hủy
        </span>
      </h1>
      <div className="p-4">
        <form onSubmit={handleSubmit(handleUpdateShip)}>
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
            <ButtonField type="submit">Cập nhật</ButtonField>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateShip;
