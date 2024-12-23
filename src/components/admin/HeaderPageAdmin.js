import React from "react";

const HeaderPageAdmin = ({ title }) => {
  return (
    <h1 className="h-[60px] flex justify-between items-center text-xl border-b ">
      <span className="pl-4">{title}</span>
    </h1>
  );
};

export default HeaderPageAdmin;
