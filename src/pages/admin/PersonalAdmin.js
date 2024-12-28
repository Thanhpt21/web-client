import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ButtonField, InputForm } from "components";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import avatarDF from "../../assets/avatar.jpg";
import { apiUpdateCurrent } from "apis";
import { getCurrent } from "store/user/userActions";
import { toast } from "react-toastify";
import HeaderPageAdmin from "components/admin/HeaderPageAdmin";
import { getBase64 } from "utils/helpers";

const PersonalAdmin = () => {
  const {
    register,
    formState: { errors, isDirty },
    reset,
    handleSubmit,
    watch,
  } = useForm();
  const { current } = useSelector((state) => state.user);
  const [preview, setPreview] = useState({
    avatar: null,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    reset({
      firstname: current?.firstname,
      lastname: current?.lastname,
      email: current?.email,
      mobile: current?.mobile,
      avatar: current?.avatar,
      address: current?.address,
    });
    setPreview({
      avatar: current?.avatar || "",
    });
  }, []);

  const handlePreviewAvatar = async (file) => {
    const base64Avatar = await getBase64(file);
    setPreview((prev) => ({ ...prev, avatar: base64Avatar }));
  };

  useEffect(() => {
    if (watch("avatar") instanceof FileList && watch("avatar").length > 0)
      handlePreviewAvatar(watch("avatar")[0]);
  }, [watch("avatar")]);

  const handleUpdateInfo = async (data) => {
    const formData = new FormData();
    if (data.avatar.length > 0) {
      formData.append("avatar", data.avatar[0]);
      delete data.avatar;
    }
    for (let i of Object.entries(data)) formData.append(i[0], i[1]);
    const response = await apiUpdateCurrent(formData);
    if (response.success) {
      dispatch(getCurrent());
      toast.success(response.message);
    } else toast.error(response.message);
  };

  return (
    <div className="w-full px-4">
      <HeaderPageAdmin title={"Quản lý tài khoản"} />
      <form
        onSubmit={handleSubmit(handleUpdateInfo)}
        className="w-3/5 mx-auto py-8 flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2 ">
          <label className="" htmlFor="avatar">
            Ảnh đại diện:
          </label>
          <input
            className="w-fit"
            type="file"
            id="avatar"
            {...register("avatar")}
          />
          {errors["avatar"] && (
            <small className="text-xs text-red-500">
              {errors["avatar"]?.message}
            </small>
          )}
        </div>
        {preview.avatar && (
          <div className="my-4">
            <img
              className="w-[100px] object-contain"
              src={preview.avatar}
              alt="avatar"
            />
          </div>
        )}
        <InputForm
          label={"Họ"}
          register={register}
          errors={errors}
          id="lastname"
          validate={{
            required: "Vui lòng nhập họ của bạn",
          }}
          placeholder={"Vui lòng nhập họ của bạn"}
        />
        <InputForm
          label={"Tên"}
          register={register}
          errors={errors}
          id="firstname"
          validate={{
            required: "Vui lòng nhập tên của bạn",
          }}
          placeholder={"Vui lòng nhập tên của bạn"}
        />
        <InputForm
          label={"Email"}
          register={register}
          errors={errors}
          id="email"
          validate={{
            required: "Vui lòng nhập email",
            pattern: {
              value: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/gm,
              message: "Email không đúng định dạng",
            },
          }}
          placeholder={"Vui lòng nhập email"}
        />
        <InputForm
          label={"Số điện thoại"}
          register={register}
          errors={errors}
          id="mobile"
          validate={{
            required: "Vui lòng nhập Số điện thoại",
            pattern: {
              value:
                /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gm,
              message: "Sdt không đúng định dạng",
            },
          }}
          placeholder={"Vui lòng nhập Số điện thoại"}
        />
        <InputForm
          label={"Địa chỉ"}
          register={register}
          errors={errors}
          id="address"
          validate={{
            required: "Vui lòng nhập Địa chỉ",
          }}
          placeholder={"Vui lòng nhập Địa chỉ"}
        />

        <div className="flex items-center gap-2">
          <span>Trạng thái tài khoản: </span>
          <span className="text-green-400">
            {current?.isBlocked === 2 ? "Đã bị khóa" : "Hoạt động"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span>Vai trò: </span>
          <span>{+current?.role === 1 ? "Admin" : "Người dùng"}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Ngày tạo tài khoản: </span>
          <span>
            {moment(current?.createdAt).format("DD/MM/YYYY HH:mm:ss")}
          </span>
        </div>
        {isDirty && (
          <div className="">
            <ButtonField type="submit">Cập nhật tài khoản</ButtonField>
          </div>
        )}
      </form>
    </div>
  );
};

export default PersonalAdmin;
