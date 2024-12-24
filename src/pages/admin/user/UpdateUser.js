import { apigetallPermissions, apiUpdateUserByAdmin } from "apis";
import { ButtonField, Loading, SelectField } from "components";
import HeaderWithCancelButton from "components/admin/HeaderWithCancelButton";
import withBase from "hocs/withBase";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { showModal } from "store/app/appSlice";
import { block, roles } from "utils/contants";

const UpdateUser = ({ dispatch, valueEdit, render, setValueEdit }) => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
    setValue,
  } = useForm();

  // Hàm xử lý khi cập nhật thông tin người dùng
  const handleUpdateUser = async (data) => {
    dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
    const response = await apiUpdateUserByAdmin(data, valueEdit._id);
    dispatch(showModal({ isShowModal: false, modalChildren: null }));

    if (response.success) {
      toast.success(response.message);
      setValueEdit(null);
      render();
    } else {
      toast.error(response.message);
    }
  };

  // Khi component được render lần đầu hoặc valueEdit thay đổi
  useEffect(() => {
    reset({
      isBlocked: valueEdit?.isBlocked || "",
      role: valueEdit?.role || "",
    });
  }, [reset, valueEdit]);

  return (
    <div className="w-full flex flex-col gap-4 relative">
      <HeaderWithCancelButton
        title={"Cập nhật tài khoản"}
        setValueEdit={setValueEdit}
      />

      <div className="p-4">
        <form onSubmit={handleSubmit(handleUpdateUser)}>
          <div className="mt-8">
            <div className="w-full my-6 flex gap-4">
              <SelectField
                label="Vai trò"
                options={roles?.map((el) => ({
                  code: el.code,
                  value: el.value,
                }))}
                register={register}
                style="flex-auto"
                id="role"
                validate={{ required: "Vui lòng chọn vai trò" }}
                errors={errors}
                fullwidth
              />
              <SelectField
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
              />
            </div>

            <ButtonField type="submit">Cập nhật tài khoản</ButtonField>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withBase(UpdateUser);
