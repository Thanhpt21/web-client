import React, { useState } from "react";

const NewsItem = ({ images, title, description }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
      {/* Hình ảnh */}
      <img
        className="w-full h-48 object-cover object-center"
        src={images}
        alt={title}
      />

      {/* Nội dung */}
      <div className="p-4">
        {/* Tiêu đề */}
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>

        {/* Mô tả ngắn */}
        <p className="text-gray-600">{description}</p>

        {/* Nội dung đầy đủ */}
        {/* <div className={`mt-4 ${expanded ? "block" : "hidden"}`}>
          <p className="text-gray-700">{content}</p>
        </div> */}

        {/* Nút xem thêm */}
        <button
          className="text-blue-500 mt-2 focus:outline-none"
          onClick={toggleExpand}
        >
          {expanded ? "Ẩn bớt" : "Xem thêm"}
        </button>
      </div>
    </div>
  );
};

export default NewsItem;
