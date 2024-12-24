import { apigetallPermissions, apiUpdateUserByAdmin } from "apis";
import { ButtonField, Loading, SelectField } from "components";
import HeaderWithCancelButton from "components/admin/HeaderWithCancelButton";
import withBase from "hocs/withBase";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { showModal } from "store/app/appSlice";
import { block, roles } from "utils/contants";

const UpdatePermission = ({
  dispatch,
  valuePermission,
  render,
  setValuePermission,
}) => {
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

  // Hàm xử lý khi cập nhật thông tin người dùng
  const handleUpdateUser = async (data) => {
    dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
    const response = await apiUpdateUserByAdmin(data, valuePermission._id);
    dispatch(showModal({ isShowModal: false, modalChildren: null }));

    if (response.success) {
      toast.success(response.message);
      setValuePermission(null);
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

  // Khi component được render lần đầu hoặc valuePermission thay đổi
  useEffect(() => {
    fetchPermissions();
    reset({
      permission: valuePermission?.permission || [],
    });
  }, [reset, valuePermission]);

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
      <h1 className="h-[60px] flex justify-between items-center text-xl px-4 border-b">
        <span>Cập nhật phân quyền</span>
        <button
          className="text-white text-[14px] bg-red-500 px-2 py-1 rounded-sm hover:bg-red-600"
          onClick={() => setValuePermission(null)}
        >
          Quay về
        </button>
      </h1>

      <div className="p-4">
        <form onSubmit={handleSubmit(handleUpdateUser)}>
          <div className="">
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

            <ButtonField type="submit">Cập nhật quyền</ButtonField>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withBase(UpdatePermission);
