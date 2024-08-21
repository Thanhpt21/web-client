import withBase from "hocs/withBase";
import React from "react";

const TagProduct = ({ product, category, navigate }) => {
  const handleTagClick = (tag) => {
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

export default withBase(TagProduct);
