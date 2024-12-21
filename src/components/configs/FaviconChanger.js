import React from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

const FaviconChanger = () => {
  const { configs } = useSelector((state) => state?.app);
  return (
    <Helmet>
      <link rel="icon" href={configs?.favicon} />
    </Helmet>
  );
};

export default FaviconChanger;
