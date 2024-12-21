import React from "react";
import noimg from "../../assets/no-image.png";
import { formatMoney } from "../../utils/helpers";
import { renderStarFromNumber } from "../../utils/helpers";
import withBase from "hocs/withBase";

const ProductCard = ({
  price,
  totalratings,
  title,
  image,
  category,
  pid,
  navigate,
}) => {
  return (
    <div
      key={pid}
      onClick={() => navigate(`/${category}/${pid}/${title}`)}
      className=""
    >
      <div>
        <img
          src={image ? image : noimg}
          class="h-[180px] w-[260px] object-contain rounded-md"
          alt="product"
        />
      </div>

      <div className="leading-7">
        <span className="line-clamp-1 capitalize text-sm">
          {title?.toLowerCase()}
        </span>
        <span className="flex h-4">
          {renderStarFromNumber(totalratings, 14)?.map((el, index) => (
            <span key={index}>{el}</span>
          ))}
        </span>
        <span>{`${formatMoney(price)} VND`}</span>
      </div>
    </div>
  );
};

export default withBase(ProductCard);
