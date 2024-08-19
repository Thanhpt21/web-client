import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TagProduct = ({ product, category }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleTagClick = (tag) => {
    setSearchTerm(tag); // Cập nhật từ tìm kiếm
    navigate(`/${category}?q=${tag}`); // Điều hướng đến trang tìm kiếm với tham số từ tìm kiếm
  };

  return (
    product?.tags.length > 0 && (
      <div className="flex gap-2">
        <span className="text-sm text-gray-500">Tags:</span>
        {product?.tags.map((el, index, array) => (
          <span
            key={index}
            className="hover:text-main flex text-gray-700 cursor-pointer"
            onClick={() => handleTagClick(el)}
          >
            {el}
            {index < array.length - 1 && ", "}
          </span>
        ))}
      </div>
    )
  );
};

export default TagProduct;
