import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import path from "utils/path";
import { BiSolidPhoneCall } from "react-icons/bi";
import { FaFacebookF, FaFacebookSquare, FaYoutube } from "react-icons/fa";

const BotFooter = ({ configs }) => {
  return (
    <div className="w-full bg-white ">
      {/* Bản quyền */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
          <div className="md:col-span-2 flex flex-col md:flex-row md:items-center gap-4">
            <Link to={`/${path.HOME}`} className="flex-shrink-0">
              <img
                src={configs?.logo || logo}
                alt="logo"
                className="h-20 object-contain"
              />
            </Link>
            <div className="md:hidden block">
              <div className="flex flex-col justify-center gap-2 h-full">
                <div className="flex items-center gap-2">
                  <div>
                    <BiSolidPhoneCall size={30} />
                  </div>
                  <div className="flex flex-col font-semibold pl-2">
                    <span className="text-[10px]">HOTLINE</span>
                    <span className="">0123.456.789</span>
                  </div>
                </div>
                <div className="flex  gap-2">
                  <div className="text-[24px] uppercase leading-none">
                    Social
                    <br />
                    Network
                  </div>
                  <div className="flex gap-1">
                    <a
                      href={configs?.facebook}
                      className="w-10 h-10 flex items-center justify-center bg-white border-2 border-black rounded-sm transition-colors duration-300 hover:bg-black hover:border-white group"
                    >
                      <FaFacebookF className="text-black group-hover:text-white transition-colors duration-300" />
                    </a>
                    <a
                      href={configs?.youtube}
                      className="w-10 h-10 flex items-center justify-center bg-white border-2 border-black rounded-sm transition-colors duration-300 hover:bg-black hover:border-white group"
                    >
                      <FaYoutube className="text-black group-hover:text-white transition-colors duration-300" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-[10px] text-gray-600">
              <p>
                © 2022 - Bản quyền thuộc Công ty TNHH Công nghệ {configs?.name}
              </p>
              <p>
                Giấy phép số 79/GP-ICP-STTTT do Sở Thông tin và Truyền thông cấp
                ngày 8/10/2012
              </p>
              <p>
                Địa chỉ: {configs?.address}. Email: {configs?.email}
              </p>
              <p>
                Số giấy chứng nhận đăng ký kinh doanh: 0304685595, đăng ký ngày
                03.11.2006 tại Sở Kế Hoạch và Đầu Tư thành phố Hồ Chí Minh.
              </p>
            </div>
          </div>
          <div className="md:col-span-1 hidden md:block">
            <div className="flex flex-col justify-between h-full">
              <div className="flex items-center justify-end gap-2">
                <div>
                  <BiSolidPhoneCall size={30} />
                </div>
                <div className="flex flex-col font-semibold pl-2">
                  <span className="text-[10px]">HOTLINE</span>
                  <span className="">0123.456.789</span>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <div className="text-[24px] uppercase leading-none">
                  Social
                  <br />
                  Network
                </div>
                <div className="flex gap-1">
                  <a
                    href={configs?.facebook}
                    target="_blank"
                    className="w-10 h-10 flex items-center justify-center bg-white border-2 border-black rounded-sm transition-colors duration-300 hover:bg-black hover:border-white group"
                  >
                    <FaFacebookF className="text-black group-hover:text-white transition-colors duration-300" />
                  </a>
                  <a
                    href={configs?.youtube}
                    target="_blank"
                    className="w-10 h-10 flex items-center justify-center bg-white border-2 border-black rounded-sm transition-colors duration-300 hover:bg-black hover:border-white group"
                  >
                    <FaYoutube className="text-black group-hover:text-white transition-colors duration-300" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotFooter;
