import React from "react";
import { useSelector } from "react-redux";
import { ProductFrame } from "components";

const Wishlist = () => {
  const { current } = useSelector((state) => state.user);

  if (!current || current?.wishlist?.length === 0) {
    return (
      <div className="w-full px-4 ">
        <header className="font-medium py-4 border-b md:text-start text-center">
          Danh sách sản phẩm yêu thích
        </header>

        {/* Dòng chữ thông báo giỏ hàng trống */}
        <div className="flex justify-center items-center py-4">
          <span className="text-xl font-semibold text-gray-500">
            Bạn chưa có sản phẩm nào trong danh sách yêu thích
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 overflow-hidden">
      <header className="font-medium py-4 border-b md:text-start text-center">
        Danh sách sản phẩm yêu thích
      </header>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 py-4">
        {current?.wishlist?.map((el) => (
          <div
            key={el._id}
            className="bg-white rounded-md shadow-md overflow-hidden"
          >
            <ProductFrame pid={el._id} data={el} showTrash={true} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
