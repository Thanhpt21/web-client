import React, { useCallback, useEffect, useState } from "react";
import {
  InputForm,
  SelectField,
  ButtonField,
  MarkDownEditer,
  Loading,
} from "components";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { validate, getBase64 } from "utils/helpers";
import { toast } from "react-toastify";
import { FaRegTrashCan } from "react-icons/fa6";
import { apiCreateProduct } from "apis";
import { showModal } from "store/app/appSlice";
import { apiCreateBlog } from "apis/blog";
import { apigetConfig, apiUpdateConfig } from "apis/config";
import { getConfig } from "store/app/appActions";

const CreateConfig = () => {
  const { configs } = useSelector((state) => state?.app);

  const dispatch = useDispatch();
  const [update, setUpdate] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (configs === null) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [configs]);

  const render = useCallback(() => {
    setUpdate(!update);
  });

  useEffect(() => {
    dispatch(getConfig());
  }, [dispatch]);

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm();

  const [preview, setPreview] = useState({
    logo: null,
    favicon: null,
  });

  useEffect(() => {
    dispatch(getConfig());
    setTimeout(() => {
      reset({
        name: configs?.name || "",
        email: configs?.email || "",
        mobile: configs?.mobile || "",
        address: configs?.address || "",
        facebook: configs?.facebook || "",
        zalo: configs?.zalo || "",
        instagram: configs?.instagram || "",
        tiktok: configs?.tiktok || "",
        youtube: configs?.youtube || "",
      });
      setPreview({
        logo: configs?.logo || "",
        favicon: configs?.favicon || "",
      });
    }, 100);
  }, [update]);

  const handlePreviewLogo = async (file) => {
    const base64 = await getBase64(file);
    setPreview((prev) => ({ ...prev, logo: base64 }));
  };

  const handlePreviewFavicon = async (file) => {
    const base64 = await getBase64(file);
    setPreview((prev) => ({ ...prev, favicon: base64 }));
  };

  useEffect(() => {
    if (watch("logo") instanceof FileList && watch("logo").length > 0)
      handlePreviewLogo(watch("logo")[0]);
  }, [watch("logo")]);

  useEffect(() => {
    if (watch("favicon") instanceof FileList && watch("favicon").length > 0)
      handlePreviewFavicon(watch("favicon")[0]);
  }, [watch("favicon")]);

  const handleUpdateConfig = async (data) => {
    const finalPayload = { ...data };
    finalPayload.logo = data?.logo?.length > 0 ? data.logo[0] : preview.logo;
    finalPayload.favicon =
      data?.favicon?.length > 0 ? data.favicon[0] : preview.favicon;
    const formData = new FormData();

    for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);

    dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
    const response = await apiUpdateConfig(formData, configs?._id);
    dispatch(showModal({ isShowModal: false, modalChildren: null }));

    if (response.success) {
      toast.success(response.message);
      render();
      dispatch(getConfig());
    } else {
      toast.error(response.message);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full bg-white min-h-screen">
      <h1 className="h-[75px] flex justify-between items-center text-xl px-4 border-b">
        <span>Cập nhật cấu hình</span>
      </h1>
      <div className="p-4">
        <form onSubmit={handleSubmit(handleUpdateConfig)}>
          <div className="flex flex-col gap-2 ">
            <label className="" htmlFor="logo">
              Upload logo
            </label>
            <input
              className="w-fit"
              type="file"
              id="logo"
              {...register("logo")}
            />
            {errors["logo"] && (
              <small className="text-xs text-red-500">
                {errors["logo"]?.message}
              </small>
            )}
          </div>
          {preview.logo && (
            <div className="my-4">
              <img
                className="w-[100px] object-contain"
                src={preview.logo}
                alt="logo"
              />
            </div>
          )}

          <div className="flex flex-col gap-2 mt-4">
            <label className="" htmlFor="favicon">
              Upload favicon
            </label>
            <input
              className="w-fit"
              type="file"
              id="favicon"
              {...register("favicon")}
            />
            {errors["favicon"] && (
              <small className="text-xs text-red-500">
                {errors["favicon"]?.message}
              </small>
            )}
          </div>
          {preview.favicon && (
            <div className="my-4">
              <img
                className="w-[100px] object-contain"
                src={preview.favicon}
                alt="favicon"
              />
            </div>
          )}

          <div className="w-full my-6 flex gap-4">
            <InputForm
              label={"Tên website"}
              register={register}
              errors={errors}
              id="name"
              validate={{
                required: "Vui lòng nhập tên website",
              }}
              fullwidth
              placeholder
              style="flex-auto"
            />
            <InputForm
              label={"Email"}
              register={register}
              errors={errors}
              id="email"
              validate={{
                required: "Vui lòng nhập Email",
              }}
              fullwidth
              placeholder
              style="flex-auto"
            />
          </div>
          <div className="w-full my-6 flex gap-4">
            <InputForm
              label={"Số điện thoại"}
              register={register}
              errors={errors}
              id="mobile"
              validate={{
                required: "Vui lòng nhập Số điện thoại",
              }}
              fullwidth
              placeholder
              style="flex-auto"
            />
            <InputForm
              label={"Địa chỉ "}
              register={register}
              errors={errors}
              id="address"
              validate={{
                required: "Vui lòng nhập Địa chỉ ",
              }}
              fullwidth
              placeholder
              style="flex-auto"
            />
          </div>
          <div className="w-full my-6 flex gap-4">
            <InputForm
              label={"Facebook"}
              register={register}
              errors={errors}
              id="facebook"
              validate={{
                required: "Vui lòng nhập đường link Facebook",
              }}
              fullwidth
              placeholder
              style="flex-auto"
            />
            <InputForm
              label={"Zalo"}
              register={register}
              errors={errors}
              id="zalo"
              validate={{
                required: "Vui lòng nhập số điện thoại zalo",
              }}
              fullwidth
              placeholder
              style="flex-auto"
            />
          </div>
          <div className="w-full my-6 flex gap-4">
            <InputForm
              label={"Instagram"}
              register={register}
              errors={errors}
              id="instagram"
              validate={{
                required: "Vui lòng nhập đường link Instagram",
              }}
              fullwidth
              placeholder
              style="flex-auto"
            />
            <InputForm
              label={"Tiktok"}
              register={register}
              errors={errors}
              id="tiktok"
              validate={{
                required: "Vui lòng nhập đường link Tiktok",
              }}
              fullwidth
              placeholder
              style="flex-auto"
            />
          </div>
          <div className="w-full my-6 flex gap-4">
            <InputForm
              label={"Youtube"}
              register={register}
              errors={errors}
              id="youtube"
              validate={{
                required: "Vui lòng nhập đường link Youtube",
              }}
              fullwidth
              placeholder
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

export default CreateConfig;
