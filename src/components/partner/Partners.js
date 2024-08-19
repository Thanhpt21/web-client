import React from "react";
import brand1 from "../../assets/brand/br-1.png";
import brand2 from "../../assets/brand/br-2.png";
import brand3 from "../../assets/brand/br-3.png";
import brand4 from "../../assets/brand/br-4.png";
import brand5 from "../../assets/brand/br-5.png";

const Partners = () => {
  return (
    <div className="w-full py-8 mt-4 hidden md:block bg-gray-200">
      <div
        data-aos="fade-in"
        className="grid grid-cols-5 gap-3 place-items-center opacity-50"
      >
        <img className="w-[80px]" src={brand1} alt="" />
        <img className="w-[80px]" src={brand2} alt="" />
        <img className="w-[80px]" src={brand3} alt="" />
        <img className="w-[80px]" src={brand4} alt="" />
        <img className="w-[80px]" src={brand5} alt="" />
      </div>
    </div>
  );
};

export default Partners;
