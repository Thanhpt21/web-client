import React from "react";
import { Link } from "react-router-dom";
import path from "utils/path";

const TopHeader = () => {
  return (
    <div className="w-full h-[30px] bg-black hidden md:block">
      <div className="h-full container  flex justify-between items-center">
        <div className="text-white text-[14px]">
          AZstore Kính chào quý khách
        </div>
        <div className="flex gap-2">
          <Link
            to={`/${path.ABOUT_US}`}
            className="text-white text-[12px] hover:text-main"
          >
            Về chúng tôi
          </Link>
          <Link
            to={`/${path.BLOG}`}
            className="text-white text-[12px] hover:text-main"
          >
            Tin tức
          </Link>
          <Link
            to={`/${path.CONTACT}`}
            className="text-white text-[12px] hover:text-main"
          >
            Liên hệ
          </Link>
          <Link
            to={`/${path.LOGIN}`}
            className="text-white text-[12px] hover:text-main"
          >
            Đăng nhập / Đăng ký
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
