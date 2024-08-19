import React, { memo } from "react";
import Slider from "react-slick";
import { ProductFrame } from "..";
import "./CustomSlider.css"; // Tạo hoặc cập nhật file CSS

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  centerMode: true,
  className: "custom-slider",
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        centerMode: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
      },
    },
  ],
};

const CustomSlider = ({ products, activeTab, normal }) => {
  return (
    <>
      {products && (
        <div className="slider-wrapper">
          <Slider {...settings} className="custom-slider">
            {products?.map((el, i) => (
              <ProductFrame
                key={i}
                pid={el._id}
                data={el}
                isNew={activeTab === 1 ? false : true}
                normal={normal}
              />
            ))}
          </Slider>
        </div>
      )}
    </>
  );
};

export default memo(CustomSlider);
