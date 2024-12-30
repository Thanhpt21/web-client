import withBase from "hocs/withBase";
import React from "react";

const HeaderWithBackButton = ({ title, navigate }) => {
  return (
    <h1 className="h-[60px] flex justify-between items-center text-xl border-b ">
      <span className="pl-4">{title}</span>
      <button
        className=" text-[14px] bg-gray-300 px-2 py-1 rounded-sm hover:bg-gray-600 pr-4"
        onClick={() => navigate(-1)}
      >
        Quay về
      </button>
    </h1>
  );
};

export default withBase(HeaderWithBackButton);
