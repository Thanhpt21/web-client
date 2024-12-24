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
    setValue, // Để cập nhật giá trị form
  } = useForm();

  const [permissions, setPermissions] = useState([]);
  const [loadingPermissions, setLoadingPermissions] = useState(true);
  const [role, setRole] = useState(valueEdit?.role || ""); // Lưu giá trị role trong state

  // Hàm xử lý khi cập nhật thông tin người dùng
  const handleUpdateUser = async (data) => {
    // Nếu vai trò là "User", set permission thành mảng rỗng
    if (data.role === "2") {
      data.permission = [];
    }

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

  // Lấy danh sách quyền từ API
  const fetchPermissions = async () => {
    try {
      const response = await apigetallPermissions();
      if (response.success) {
        setPermissions(response.permissionData);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Lỗi khi lấy dữ liệu quyền.");
    } finally {
      setLoadingPermissions(false);
    }
  };

  // Khi component được render lần đầu hoặc valueEdit thay đổi
  useEffect(() => {
    fetchPermissions();
    reset({
      isBlocked: valueEdit?.isBlocked || "",
      role: valueEdit?.role || "",
      permission: valueEdit?.permission || [],
    });
  }, [reset, valueEdit]);

  // Hàm xử lý khi thay đổi role
  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;

    setRole(selectedRole); // Cập nhật role trong state
    setValue("role", selectedRole); // Cập nhật giá trị của role trong form
  };

  const selectedPermission = watch("permission") || [];

  // Hàm xử lý khi checkbox thay đổi
  const handlePermissionChange = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;

    setValue(
      "permission",
      checked
        ? [...selectedPermission, value]
        : selectedPermission.filter((v) => v !== value)
    );
  };

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
                onChange={handleRoleChange} // Gắn hàm xử lý thay đổi role
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

            {/* Hiển thị phần phân quyền nếu vai trò là Admin */}
            {role === "1" && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Phân quyền
                </label>
                {loadingPermissions ? (
                  <Loading />
                ) : (
                  <div className="mt-2 flex flex-col gap-2">
                    {permissions.map((permission) => (
                      <div
                        key={permission._id}
                        className="flex items-center gap-2"
                      >
                        <input
                          type="checkbox"
                          id={`permission-${permission._id}`}
                          value={permission._id}
                          {...register("permission")}
                          checked={selectedPermission.includes(permission._id)}
                          onChange={handlePermissionChange}
                        />
                        <label
                          htmlFor={`permission-${permission._id}`}
                          className="text-sm text-gray-600"
                        >
                          {permission.name}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <ButtonField type="submit">Cập nhật tài khoản</ButtonField>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withBase(UpdateUser);
