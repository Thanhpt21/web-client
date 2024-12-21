import React, { useCallback, useEffect, useState } from "react";
import { InputField, ButtonField, Loading } from "../../components";
import { apiRegister, apiLogin } from "../../apis/user";
import Swal from "sweetalert2";
import { useNavigate, useSearchParams } from "react-router-dom";
import path from "../../utils/path";
import { login } from "../../store/user/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { showModal } from "../../store/app/appSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    mobile: "",
  });

  const [isRegister, setIsRegister] = useState(false);
  const [searchParams] = useSearchParams();

  const resetPayload = () => {
    setPayload({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      mobile: "",
    });
  };

  useEffect(() => {
    resetPayload();
  }, [isRegister]);

  const handleSubmit = useCallback(async () => {
    const { firstname, lastname, phone, ...data } = payload;

    if (isRegister) {
      dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
      const response = await apiRegister(payload);
      dispatch(showModal({ isShowModal: false, modalChildren: null }));

      if (response.success) {
        Swal.fire("Đăng ký thành công", response.message, "success").then(
          () => {
            setIsRegister(false);
            resetPayload();
          }
        );
      } else {
        Swal.fire("Opps", response.message, "error");
      }
    } else {
      const res = await apiLogin(data);
      if (res.success) {
        dispatch(
          login({
            isLoggedIn: true,
            token: res.accessToken,
            userData: res.userData,
          })
        );
        searchParams.get("redirect")
          ? navigate(searchParams.get("redirect"))
          : navigate(`/${path.HOME}`);
      } else {
        Swal.fire("Opps", res.message, "error");
      }
    }
  }, [payload, isRegister]);

  return (
    <div className="grid place-items-center h-screen p-8">
      <img
        src="https://www.visiondesign.com/wp-content/uploads/hero-background-ecommerce-1.jpg"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative p-8 bg-white rounded-md max-w-md w-full">
        <h1 className="mb-8 text-2xl font-semibold text-main">
          {isRegister ? "Đăng ký" : "Đăng nhập"}
        </h1>
        {isRegister && (
          <div className="flex items-center gap-2 mb-4">
            <InputField
              value={payload.firstname}
              setValue={setPayload}
              nameKey="firstname"
              fw
            />
            <InputField
              value={payload.lastname}
              setValue={setPayload}
              nameKey="lastname"
              fw
            />
          </div>
        )}

        <InputField
          value={payload.email}
          setValue={setPayload}
          nameKey="email"
          fw
        />
        {isRegister && (
          <InputField
            value={payload.mobile}
            setValue={setPayload}
            nameKey="mobile"
            fw
          />
        )}
        <InputField
          value={payload.password}
          setValue={setPayload}
          nameKey="password"
          type="password"
          fw
        />
        <ButtonField fw handleOnClick={handleSubmit}>
          {isRegister ? "Đăng ký" : "Đăng nhập"}
        </ButtonField>
        <div className="flex items-center justify-between mt-4 text-sm">
          {!isRegister && (
            <span className="text-blue-500 hover:underline cursor-pointer">
              Quên mật khẩu
            </span>
          )}
          {!isRegister ? (
            <span
              onClick={() => setIsRegister(true)}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Tạo tài khoản
            </span>
          ) : (
            <span
              onClick={() => setIsRegister(false)}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Đăng nhập tài khoản
            </span>
          )}
        </div>
        <Link
          to={`/${path.HOME}`}
          className="block mt-4 text-blue-500 hover:underline cursor-pointer"
        >
          Trở về trang chủ
        </Link>
      </div>
    </div>
  );
};

export default Login;
