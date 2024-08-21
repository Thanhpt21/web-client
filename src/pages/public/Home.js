import React from "react";
import {
  FeartureProduct,
  Category,
  Service,
  Blogs,
  BannerHome,
  NewProduct,
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
    </>
  );
};

export default withBase(Home);
