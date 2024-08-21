import React, { useEffect } from "react";
import { InputForm, ButtonField, Loading } from "components";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { showModal } from "store/app/appSlice";

import { apiUpdateRetail } from "apis";

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
      name: valueEdit?.name || "",
      address: valueEdit?.address || "",
      mobile: valueEdit?.mobile || "",
      link: valueEdit?.link || "",
      iframe: valueEdit?.iframe || "",
    });
  }, []);

  const getIframeSrc = (html) => {
    const srcPattern = /src="([^"]*)"/;
    const match = html.match(srcPattern);
    return match ? match[1] : "";
  };

  const handleUpdateRetail = async (data) => {
    data.iframe = getIframeSrc(data.iframe);

    dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
    const response = await apiUpdateRetail(data, valueEdit?._id);
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
        <span>Cập nhật chi nhánh</span>
        <span
          className="text-main hover:underline cursor-pointer"
          onClick={() => setValueEdit(null)}
        >
          Hủy
        </span>
      </h1>
      <div className="p-4">
        <form onSubmit={handleSubmit(handleUpdateRetail)}>
          <div className="w-full my-6 flex gap-4">
            <InputForm
              label={"Tên chi nhánh"}
              register={register}
              errors={errors}
              id="name"
              validate={{
                required: "Vui lòng nhập tên chi nhánh",
              }}
              fullwidth
              placeholder="Nhập tên chi nhánh"
              style="flex-1"
            />
            <InputForm
              label={"Địa chỉ"}
              register={register}
              errors={errors}
              id="address"
              validate={{
                required: "Vui lòng nhập Địa chỉ",
              }}
              fullwidth
              placeholder="Nhập Địa chỉ"
              style="flex-1"
            />
            <InputForm
              label={"SDT"}
              register={register}
              errors={errors}
              id="mobile"
              validate={{
                required: "Vui lòng nhập SDT",
              }}
              fullwidth
              placeholder="Nhập SDT"
              style="flex-1"
              type="number"
            />
          </div>
          <div className="w-full my-6 flex gap-4">
            <InputForm
              label={"Link gg map"}
              register={register}
              errors={errors}
              id="link"
              validate={{
                required: "Vui lòng nhập link gg map",
              }}
              fullwidth
              placeholder="Nhập link gg map"
              style="flex-auto"
            />
            <InputForm
              label={"Link iframe"}
              register={register}
              errors={errors}
              id="iframe"
              validate={{
                required: "Vui lòng nhập link iframe",
              }}
              fullwidth
              placeholder="Nhập link iframe"
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

export default UpdateShip;
