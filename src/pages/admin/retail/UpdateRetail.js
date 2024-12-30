import React, { useEffect, useState } from "react";
import { InputForm, ButtonField, Loading } from "components";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { showModal } from "store/app/appSlice";

import { apiUpdateRetail } from "apis";
import HeaderWithCancelButton from "components/admin/HeaderWithCancelButton";
import { getBase64 } from "utils/helpers";

const UpdateShip = ({ valueEdit, render, setValueEdit }) => {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm();

  useEffect(() => {
    reset({
      name: valueEdit?.name || "",
      address: valueEdit?.address || "",
      mobile: valueEdit?.mobile || "",
      link: valueEdit?.link || "",
      iframe: valueEdit?.iframe || "",
    });
    setPreview({
      images: valueEdit?.images || "",
    });
  }, []);

  const [preview, setPreview] = useState({
    images: null,
  });

  const handlePreview = async (file) => {
    const base64 = await getBase64(file);
    setPreview((prev) => ({ ...prev, images: base64 }));
  };

  useEffect(() => {
    if (watch("images") instanceof FileList && watch("images").length > 0)
      handlePreview(watch("images")[0]);
  }, [watch("images")]);

  const getIframeSrc = (html) => {
    const srcPattern = /src="([^"]*)"/;
    const match = html.match(srcPattern);
    return match ? match[1] : "";
  };

  const handleUpdateRetail = async (data) => {
    const finalPayload = { ...data };
    finalPayload.iframe = getIframeSrc(finalPayload.iframe);
    finalPayload.images =
      data?.images?.length > 0 ? data.images[0] : preview.images;

    const formData = new FormData();

    for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);

    dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
    const response = await apiUpdateRetail(formData, valueEdit?._id);
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
      <HeaderWithCancelButton
        title={"Cập nhật chi nhánh"}
        setValueEdit={setValueEdit}
      />

      <div className="p-4">
        <form onSubmit={handleSubmit(handleUpdateRetail)}>
          <div className="flex flex-col gap-2 ">
            <label className="" htmlFor="images">
              Upload ảnh
            </label>
            <input
              className="w-fit"
              type="file"
              id="images"
              {...register("images")}
            />
            {errors["images"] && (
              <small className="text-xs text-red-500">
                {errors["images"]?.message}
              </small>
            )}
          </div>
          {preview.images && (
            <div className="my-4">
              <img
                className="w-[100px] object-contain"
                src={preview.images}
                alt="images"
              />
            </div>
          )}
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
