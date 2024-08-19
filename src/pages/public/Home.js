import React, { useEffect, useState } from "react";
import {
  Sidebar,
  Banner,
  BestSeller,
  DealDaily,
  FeartureProduct,
  Product,
  CustomSlider,
  Category,
  Service,
  Blogs,
  Partners,
  BannerHome,
  NewProduct,
} from "../../components";
import { useSelector } from "react-redux";
import icons from "../../utils/icons";
import { UpdateFollower } from "react-mouse-follower";

import withBase from "hocs/withBase";

const Home = ({ dispatch }) => {
  const { categories } = useSelector((state) => state?.app);
  const { isLoggedIn, current } = useSelector((state) => state?.user);

  return (
    <>
      {/* <div className="w-main flex mt-6">
        <div className="flex flex-col gap-5 w-[25%] flex-auto">
          <Sidebar />
          <DealDaily />
        </div>
        <div className="flex flex-col gap-5 pl-5 w-[75%] flex-auto">
          <Banner />
          <BestSeller />
        </div>
      </div> */}
      <Service />

      <FeartureProduct />
      <Category />
      <BannerHome />
      <NewProduct />
      <Blogs />
    </>
  );
};

export default withBase(Home);
