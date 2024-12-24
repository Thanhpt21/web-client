import React from "react";
import { InputForm, ButtonField, Loading } from "components";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { showModal } from "store/app/appSlice";
import withBase from "hocs/withBase";
import { apiCreatePermission } from "apis/permission"; // Chỉnh sửa API phù hợp với Permission
import HeaderPageAdmin from "components/admin/HeaderPageAdmin";

const CreatePermission = ({ dispatch }) => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();

  const handleCreatePermission = async (data) => {
    dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
    const response = await apiCreatePermission(data); // Chỉnh sửa API thành apiCreatePermission
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
      <HeaderPageAdmin title={"Thêm mới quyền"} />
      <div className="p-4">
        <form onSubmit={handleSubmit(handleCreatePermission)}>
          <div className="w-full my-6 flex gap-4">
            <InputForm
              label={"Tên quyền"} // Đổi tên trường thành "Tên quyền"
              register={register}
              errors={errors}
              id="name"
              validate={{
                required: "Vui lòng nhập tên quyền", // Cập nhật thông báo lỗi
              }}
              fullwidth
              placeholder="Vui lòng nhập tên quyền"
              style="flex-auto"
            />
            <InputForm
              label={"Link"} // Đổi tên trường thành "Link"
              register={register}
              errors={errors}
              id="link"
              validate={{
                required: "Vui lòng nhập link", // Cập nhật thông báo lỗi
              }}
              fullwidth
              placeholder="Vui lòng nhập link"
              style="flex-auto"
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

export default withBase(CreatePermission);
