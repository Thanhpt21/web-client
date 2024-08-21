import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ButtonField, InputForm } from "components";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import avatarDF from "../../assets/avatar.jpg";
import { apiUpdateCurrent } from "apis";
import { getCurrent } from "store/user/userActions";
import { toast } from "react-toastify";

const Personal = () => {
  const {
    register,
    formState: { errors, isDirty },
    reset,
    handleSubmit,
  } = useForm();
  const { current } = useSelector((state) => state.user);
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
  }, []);

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
      <header className="py-4  text-center md:text-start">
        Thông tin cá nhân
      </header>
      <form
        onSubmit={handleSubmit(handleUpdateInfo)}
        className="md:w-3/5 w-4/5 mx-auto py-8 flex flex-col gap-4"
      >
        <div className="flex items-center gap-2">
          <span>Ảnh đại diện: </span>
          <label htmlFor="file">
            <img
              src={current?.avatar || avatarDF}
              alt="logo"
              className="w-16 h-16 object-cover"
            />
          </label>
          <input {...register("avatar")} type="file" id="file" hidden />
        </div>
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

export default Personal;
