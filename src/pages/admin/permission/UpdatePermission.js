import React, { useEffect } from "react";
import { InputForm, ButtonField, Loading } from "components";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { showModal } from "store/app/appSlice";
import { apiUpdatePermission } from "apis/permission"; // Thay đổi API từ 'ship' thành 'permission'
import HeaderWithCancelButton from "components/admin/HeaderWithCancelButton";

const UpdatePermission = ({ valueEdit, render, setValueEdit }) => {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();

  // Sử dụng useEffect để reset form khi có giá trị edit
  useEffect(() => {
    reset({
      name: valueEdit?.name || "", // Sử dụng name thay vì province
      link: valueEdit?.link || "", // Sử dụng link thay vì price
    });
  }, [valueEdit, reset]);

  const handleUpdatePermission = async (data) => {
    dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
    const response = await apiUpdatePermission(data, valueEdit?._id); // Gọi API cập nhật Permission
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
    <div className="w-full">
      <HeaderWithCancelButton
        title={"Cập nhật quyền"} // Tiêu đề thay đổi từ "Cập nhật phí vận chuyển"
        setValueEdit={setValueEdit}
      />

      <div className="p-4">
        <form onSubmit={handleSubmit(handleUpdatePermission)}>
          <div className="w-full my-6 flex gap-4">
            <InputForm
              label={"Tên quyền"} // Label thay đổi từ "Tên tỉnh thành"
              register={register}
              errors={errors}
              id="name"
              validate={{
                required: "Vui lòng nhập tên quyền", // Thông báo lỗi thay đổi
              }}
              fullwidth
              placeholder="Vui lòng nhập tên quyền"
              style="flex-auto"
            />
            <InputForm
              label={"Link quyền"} // Label thay đổi từ "Phí ship"
              register={register}
              errors={errors}
              id="link"
              validate={{
                required: "Vui lòng nhập link quyền", // Thông báo lỗi thay đổi
              }}
              fullwidth
              placeholder="Vui lòng nhập link quyền"
              style="flex-auto"
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

export default UpdatePermission;
