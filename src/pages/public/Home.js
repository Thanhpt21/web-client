import React from "react";
import {
  FeartureProduct,
  Category,
  Service,
  Blogs,
  BannerHome,
  NewProduct,
  Partners,
} from "../../components";

import withBase from "hocs/withBase";

const Home = ({}) => {
  return (
    <>
      <Service />
      <FeartureProduct />
      <Category />
      <BannerHome />
      <NewProduct />
      <Blogs />
      <Partners />
    </>
  );
};

export default withBase(Home);
