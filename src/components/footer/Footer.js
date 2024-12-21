import React, { memo, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { GoArrowRight } from "react-icons/go";

import BotFooter from "./BotFooter";
import ModalRetail from "components/common/ModalRetail";

const data = [
  { id: 1, title: "Giới Thiệu", link: "gioi-thieu" },
  { id: 2, title: "Liên Hệ", link: "lien-he" },
  { id: 3, title: "Hướng Dẫn Đặt Hàng", link: "huong-dan-dat-hang" },
  {
    id: 4,
    title: "Chính Sách Đổi Trả & Hoàn Tiền",
    link: "chinh-sach-doi-tra-hoan-tien",
  },
  { id: 5, title: "Chính Sách Thanh Toán", link: "chinh-sach-thanh-toan" },
  {
    id: 6,
    title: "Chính Sách Giao Nhận & Kiểm Hàng",
    link: "chinh-sach-giao-nhan-kiem-hang",
  },
  { id: 7, title: "Bảo Mật Thanh Toán", link: "bao-mat-thanh-toan" },
  {
    id: 9,
    title: "Chính Sách Tiếp Nhận & Giải Quyết Khiếu Nại",
    link: "chinh-sach-tiep-nhan-giai-quyet-khieu-nai",
  },
];

const info = [
  {
    id: 1,
    title: "Đổi mới trong vòng 15 ngày nếu sản phẩm bị lỗi do nhà sản xuất",
  },
  {
    id: 2,
    title: "hấp nhận thanh toán trực tiếp, chuyển khoản online",
  },
  {
    id: 3,
    title:
      "Gọi ngay Phòng kinh doanh Online - ĐT: (028) 38.200.888 - 0981.200.888 (Viber, Zalo, WhatsApp, iMessage) để được tư vấn và giao hàng tận nơi trên toàn quốc.",
  },
];

const Footer = () => {
  const { configs, retails } = useSelector((state) => state?.app);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="w-full bg-black text-white">
        <div className="container mx-auto py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-1">
              <div className="flex justify-center items-center gap-2">
                <div className="text-[80px] text-gray-400">
                  {retails?.length}
                </div>
                <div>
                  <p className="text-[#777777]">Hệ thống</p>
                  <p className="text-[40px]">Trading</p>
                  <div className=" flex gap-1 items-center">
                    <span
                      onClick={openModal}
                      className="text-[12px] text-[#777777] hover:text-white cursor-pointer"
                    >
                      cửa hàng khắp cả nước
                    </span>
                    <GoArrowRight />
                  </div>
                </div>
                <ModalRetail
                  children={retails}
                  isOpen={isModalOpen}
                  onClose={closeModal}
                />
              </div>
            </div>
            <div className="md:col-span-1 flex flex-col gap-4">
              <div className="text-white uppercase leading-none">
                <p className="uppercase text-[14px]">Đặt hàng online</p>
                <p className="uppercase text-[24px]">Giao hàng tận nơi</p>
              </div>
              <div className="text-gray-500 flex flex-col gap-4">
                {info?.map((el) => (
                  <div
                    key={el.id}
                    className="flex gap-2 items-center text-[12px]"
                  >
                    <span className="px-2 py-[3px] border-gray-300 border border-1 rounded-full ">
                      {el.id}
                    </span>
                    <p className="">{el.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-[#0B0B0B] py-2 border-1">
        <div className="container mx-auto grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-2">
          {data?.map((el) => (
            <Link
              key={el.id}
              className="text-[11px] text-gray-500"
              to={el.link}
            >
              {el.title}
            </Link>
          ))}
        </div>
      </div>

      <BotFooter configs={configs} />
    </>
  );
};

export default memo(Footer);
