import React, { memo } from "react";

const ProductExtraInfo = ({ icon, title, sub }) => {
  return (
    <div className="flex items-center gap-4">
      <span className="p-2 bg-gray-700 rounded-full flex items-center justify-center text-white">
        {icon}
      </span>
      <div className="flex flex-col text-sm text-gray-500">
        <span className="font-medium">{title}</span>
        <span className="text-xs">{sub}</span>
      </div>
    </div>
  );
};

export default memo(ProductExtraInfo);
