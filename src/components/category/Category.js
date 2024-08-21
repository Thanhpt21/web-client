import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { convertToSlug } from "utils/helpers";

const Category = () => {
  const { categories } = useSelector((state) => state?.app);
  return (
    <div data-aos="fade-in" className="py-8">
      <div className="bg-white shadow-sm p-6 rounded-sm">
        <h2 className="text-[24px] font-bold text-black">DANH MỤC SẢN PHẨM</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 ">
          {categories?.map((el) => (
            <div className="flex flex-col justify-center items-center border border-1 border-gray-100 py-4">
              <img className="w-15" src={el?.images} alt={el.title} />
              <NavLink
                key={el._id}
                to={`/${convertToSlug(el.title)}`}
                className="text-[14px] text-gray-500 hover:text-black"
              >
                {el.title}
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
