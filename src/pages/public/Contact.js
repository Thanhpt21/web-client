import { apigetAllRetails } from "apis";
import { apiCreateEnquiry } from "apis/enquiry";
import { Breadcrumbs, ButtonField, InputForm, Loading } from "components";
import BreadcrumbsDefault from "components/common/BreadcrumbsDefault";
import withBase from "hocs/withBase";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiInfoCircle, BiPhoneCall } from "react-icons/bi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { showModal } from "store/app/appSlice";
import path from "utils/path";

const Contact = ({ dispatch }) => {
  const { configs } = useSelector((state) => state?.app);
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm();

  const [dataRetail, setdataRetail] = useState(null);
  const [selectedRetail, setSelectedRetail] = useState(null);

  const handleRetailClick = (retail) => {
    setSelectedRetail(retail);
  };

  const handleCreateEnq = async (data) => {
    dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
    const response = await apiCreateEnquiry(data);
    dispatch(showModal({ isShowModal: false, modalChildren: null }));

    if (response.success) {
      toast.success(response.message);
      reset();
    } else {
      toast.error(response.message);
    }
  };

  const fetchRetail = async () => {
    const response = await apigetAllRetails();
    if (response.success) {
      setdataRetail(response.retails);
      if (response.retails.length > 0) {
        setSelectedRetail(response.retails[0]);
      }
    }
  };

  useEffect(() => {
    fetchRetail();
  }, []);

  return (
    <div className="w-full">
      <BreadcrumbsDefault path1={path.HOME} path2={path.CONTACT} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="w-full">
          <iframe
            src={
              selectedRetail
                ? selectedRetail?.link
                : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d501725.41843254614!2d106.36555703781768!3d10.755292870470326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f39281c2f69%3A0x65f5e93190fb3464!2sSunrise%20Central%20Hotel!5e0!3m2!1svi!2s!4v1723638275361!5m2!1svi!2s"
            }
            height="450"
            width="100%"
            className="border-0 w-100"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div>
          <div>
            <h3 className="text-main font-medium uppercase">
              Hệ thống cửa hàng
            </h3>
          </div>
          <ul>
            {dataRetail?.map((retail) => (
              <li
                key={retail.name}
                className="cursor-pointer mb-2"
                onClick={() => handleRetailClick(retail)}
              >
                <div className="font-medium hover:text-main">{retail.name}</div>
                <div className="text-gray-600">{retail.mobile}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div className="w-full">
          <h3 className="text-main font-medium uppercase">Thông tin liên hệ</h3>
          <div className="mt-2">
            <ul className="list-none p-0">
              <li className="mb-3 flex items-center gap-3">
                <AiOutlineHome className="text-xl" />
                <p className="text-small">{configs?.address}</p>
              </li>
              <li className="mb-3 flex items-center gap-3">
                <BiPhoneCall className="text-xl" />
                <p className="text-small">{configs?.mobile}</p>
              </li>
              <li className="mb-3 flex items-center gap-3">
                <AiOutlineMail className="text-xl" />
                <p className="text-small">{configs?.email}</p>
              </li>
              <li className="mb-3 flex items-center gap-3">
                <BiInfoCircle className="text-xl" />
                <p className="text-small">Monday-Friday 8AM - 10PM</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full">
          <div className="w-full">
            <h3 className="text-main font-medium">LIÊN HỆ VỚI CHÚNG TÔI</h3>
            <form
              onSubmit={handleSubmit(handleCreateEnq)}
              action=""
              className="flex flex-col gap-2 mt-2"
            >
              <div className="flex gap-2">
                <InputForm
                  label={"Tên"}
                  register={register}
                  errors={errors}
                  id="name"
                  validate={{
                    required: "Vui lòng nhập tên",
                  }}
                  fullwidth
                  style="flex-auto"
                  placeholder="Vui lòng nhập tên"
                />
              </div>
              <div className="flex gap-2">
                <InputForm
                  label={"Email"}
                  register={register}
                  errors={errors}
                  id="email"
                  validate={{
                    required: "Vui lòng nhập Email",
                  }}
                  fullwidth
                  style="flex-auto"
                  placeholder="Vui lòng nhập Email"
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
                  style="flex-auto"
                  placeholder="Vui lòng nhập SDT"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="comment">Bình luận</label>
                <textarea
                  id="comment"
                  {...register("comment")}
                  rows="5"
                  cols="50"
                  placeholder="Vui lòng nhập bình luận"
                ></textarea>
              </div>
              <div className="mt-4">
                <ButtonField type="submit">Gửi đi</ButtonField>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withBase(Contact);
