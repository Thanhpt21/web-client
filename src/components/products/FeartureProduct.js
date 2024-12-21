import React, { useState, useEffect } from "react";
import { getProducts } from "../../apis";
import ProductFrame from "./ProductFrame";

const FeartureProduct = () => {
  const [product, setProduct] = useState(null);
  const [visibleCount, setVisibleCount] = useState(4); // Số lượng sản phẩm hiển thị ban đầu
  const [hasMore, setHasMore] = useState(true); // Kiểm tra nếu còn sản phẩm để hiển thị

  const fetchProducts = async () => {
    const response = await getProducts();
    if (response.success) {
      setProduct(response.products);
    }
    if (response.products?.length <= visibleCount) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => {
      // Tăng số lượng sản phẩm hiển thị
      const newCount = prevCount + 4;
      // Kiểm tra nếu có thêm sản phẩm
      if (newCount >= product.length) {
        setHasMore(false);
      }
      return newCount;
    });
  };

  return (
    <div className="bg-white shadow-sm p-2 rounded-sm">
      <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
        SẢN PHẨM
      </h3>
      <div
        data-aos="fade-in"
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 place-items-center py-8"
      >
        {product?.slice(0, visibleCount).map((el, i) => (
          <ProductFrame data={el} key={i} pid={el._id} normal={false} />
        ))}
      </div>
      {hasMore && (
        <div className="text-center py-4">
          <button
            className="bg-black text-white px-4 py-2 rounded-sm"
            onClick={handleLoadMore}
          >
            Xem thêm sản phẩm
          </button>
        </div>
      )}
    </div>
  );
};

export default FeartureProduct;
