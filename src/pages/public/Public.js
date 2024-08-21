import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import {
  Header,
  Footer,
  Hero,
  Partners,
  ScrollToTopButton,
  SocialButtons,
} from "../../components";

const Public = () => {
  const location = useLocation();

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

export default Public;
