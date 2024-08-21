import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import {
  Header,
  Footer,
  Hero,
  Partners,
  ScrollToTopButton,
  SocialButtons,
} from "../../components";
import withBase from "hocs/withBase";
import path from "utils/path";

const Public = ({ navigate, location }) => {
  useEffect(() => {
    // Kiểm tra nếu đường dẫn hiện tại không phải là trang chủ
    if (location.pathname === `/`) {
      navigate(`/${path.HOME}`); // Điều hướng đến trang chính
    }
  }, [location, navigate]);

  return (
    <div className="min-h-screen overflow-y-auto w-full">
      <Header />

      {location?.pathname === "/trang-chu" && <Hero />}

      <div className="w-full" style={{ backgroundColor: "#F8F8F8" }}>
        <div className="container">
          <Outlet />
        </div>
      </div>

      <Partners />
      <Footer />
      <ScrollToTopButton />
      <SocialButtons />
    </div>
  );
};

export default withBase(Public);
