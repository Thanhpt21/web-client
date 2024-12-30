import React from "react";
import banner1 from "../../assets/banner/banner1.png";

const data = {
  discount: "30% GIẢM GIÁ",
  title: "Fine Smile",
  date: "10 Tháng 1 đến 28 Tháng 1",
  image: banner1,
  title2: "Air Solo Bass",
  title3: "Khuyến Mãi Mùa Đông",
  title4:
    "Khám phá các ưu đãi hấp dẫn trong dịp mùa đông này. Đừng bỏ lỡ cơ hội sở hữu sản phẩm chất lượng với giá ưu đãi!",
  bgColor: "#f42c37",
};

const BannerHome = () => {
  return (
    <div className="flex justify-center items-center">
      <div
        style={{ backgroundColor: data.bgColor }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-white rounded-3xl"
      >
        <div className="p-6 sm:p-8">
          <p data-aos="slide-right" className="text-sm">
            {data.discount}
          </p>
          <h1
            data-aos="zoom-out"
            className="uppercase text-4xl lg:text-7xl font-bold"
          >
            {data.title}
          </h1>
          <p data-aos="fade-up" className="text0sm">
            {data.date}
          </p>
        </div>
        <div data-aos="zoom-in" className="h-full flex items-center">
          <img
            className="scale-125 w-[350px] md:w-[450px] drop-shadow-2xl object-cover"
            src={data.image}
          ></img>
        </div>
        <div className="flex flex-col justify-center gap-4 p-6 sm:p-8">
          <p data-aos="zoom-out" className="font-bold text-xl">
            {data.title2}
          </p>
          <p data-aos="fade-up" className="text-3xl sm:text-5xl font-semibold">
            {data.title3}
          </p>
          <p data-aos="fade-up" className="text-sm tracking-wide leading-5">
            {data.title4}
          </p>

          <div data-aos="fade-up" data-aos-offset="0">
            <button
              style={{ color: data.bgColor }}
              className="bg-white py-2 px-4 rounded-full"
            >
              Xem thêm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerHome;
