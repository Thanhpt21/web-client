import React, { memo } from "react";

const SelectQuantity = ({ quantity, handleQuantity, handleChangeQuantity }) => {
  return (
    <div className="flex items-center border border-black rounded-md">
      <span
        onClick={() => handleChangeQuantity("minus")}
        className="p-2 cursor-pointer border-r border-black flex-shrink-0"
      >
        -
      </span>
      <input
        className="py-2 outline-none w-[40px] text-center border-0"
        type="text"
        value={quantity}
        onChange={(e) => handleQuantity(e.target.value)}
      />
      <span
        onClick={() => handleChangeQuantity("plus")}
        className="p-2 cursor-pointer border-l border-black flex-shrink-0"
      >
        +
      </span>
    </div>
  );
};

export default memo(SelectQuantity);
