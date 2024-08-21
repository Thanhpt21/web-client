import React from "react";
import { useSelector } from "react-redux";
import { ProductFrame } from "components";

const Wishlist = () => {
  const { current } = useSelector((state) => state.user);

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
