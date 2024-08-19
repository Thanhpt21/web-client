import withBase from "hocs/withBase";
import React, { useState, useEffect } from "react";
import { FaArrowUp, FaShoppingCart } from "react-icons/fa";
import { GiShoppingBag } from "react-icons/gi";
import { showCart } from "store/app/appSlice";

const ScrollToTopButton = ({ dispatch }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Xử lý sự kiện cuộn trang
  const handleScroll = () => {
    if (window.scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Sử dụng useEffect để theo dõi sự kiện cuộn trang
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Xử lý khi click nút quay về đầu trang
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`fixed bottom-4 right-4 flex flex-col transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Nút giỏ hàng */}
      {/* <div className="bg-black p-[2px] rounded-0 flex items-center justify-center transition-colors duration-300 hover:bg-red-600">
        <button
          className="bg-transparent text-white font-bold p-2 rounded-full flex items-center justify-center"
          onClick={() => dispatch(showCart())}
        >
          <GiShoppingBag size={16} />
        </button>
      </div> */}
      {/* Nút quay về đầu trang */}
      <div className="bg-black p-[2px] rounded-0 flex items-center justify-center transition-colors duration-300 hover:bg-red-600">
        <button
          className="bg-transparent text-white font-bold p-2 rounded-full flex items-center justify-center"
          onClick={scrollToTop}
        >
          <FaArrowUp size={16} />
        </button>
      </div>
    </div>
  );
};

export default withBase(ScrollToTopButton);
