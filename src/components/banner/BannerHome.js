import React from "react";
import headphone from "../../assets/banner/banner.png";

const data = {
  discount: "30% OFF",
  title: "Fine Smile",
  date: "10 Jan to 28 Jan",
  image: headphone,
  title2: "Air Solo Bass",
  title3: "Winter Sale",
  title4:
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque reiciendis",
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
            className="scale-125 w-[250px] md:w-[340px] drop-shadow-2xl object-cover"
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
