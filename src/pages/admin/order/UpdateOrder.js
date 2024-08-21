import { apiUpdateStatus } from "apis";
import { ButtonField, Loading, SelectField } from "components";
import withBase from "hocs/withBase";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { showModal } from "store/app/appSlice";
import { statusOrder } from "utils/contants";

const UpdateOrder = ({ dispatch, valueEdit, render, setValueEdit }) => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm();

  const handleUpdateOrder = async (data) => {
    dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
    const response = await apiUpdateStatus(data, valueEdit._id);
    dispatch(showModal({ isShowModal: false, modalChildren: null }));

    if (response.success) {
      toast.success(response.message);
      setValueEdit(null);
      render();
    } else {
      toast.error(response.message);
    }
  };

  useEffect(() => {
    reset({
      status: valueEdit?.status || "",
    });
  }, []);
  return (
    <div className="w-full flex flex-col gap-4 relative">
      <h1 className="h-[75px] flex justify-between items-center text-xl px-4 border-b">
        <span>Cập nhật đơn hàng</span>
        <span
          className="text-main hover:underline cursor-pointer"
          onClick={() => setValueEdit(null)}
        >
          Hủy
        </span>
      </h1>
      <div className="p-4">
        <form onSubmit={handleSubmit(handleUpdateOrder)}>
          <div className="mt-8 flex flex-col gap-4">
            <div className="w-full grid grid-cols-2 gap-4">
              <div className="grid grid-cols-1">
                <SelectField
                  defaultValue={valueEdit?.status}
                  label="Trạng thái"
                  options={statusOrder?.map((el) => ({
                    code: el.code,
                    value: el.value,
                  }))}
                  register={register}
                  style="flex-auto"
                  id="status"
                  validate={{ required: "Vui lòng chọn trạng thái" }}
                  errors={errors}
                  fullwidth
                />
              </div>
              <div className="grid grid-cols-1"></div>

              {/* <SelectField
                defaultValue={valueEdit?.isBlocked}
                label="Trạng thái"
                options={block?.map((el) => ({
                  code: el.code,
                  value: el.value,
                }))}
                register={register}
                style="flex-auto"
                id="isBlocked"
                validate={{ required: "Vui lòng chọn Trạng thái" }}
                errors={errors}
                fullwidth
              /> */}
            </div>

            <ButtonField type="submit">Cập nhật đơn hàng</ButtonField>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withBase(UpdateOrder);
