import React, { useState, useCallback, useEffect } from "react";
import SelectQuantity from "components/select/SelectQuantity";
import { convertToSlug, formatMoney } from "utils/helpers";
import { updateCart } from "store/user/userSlice";
import withBase from "hocs/withBase";
import { ImBin } from "react-icons/im";
import { apiRemoveCart } from "apis";
import { getCurrent } from "store/user/userActions";
import { toast } from "react-toastify";

const CartItem = ({
  navigate,
  category,
  quantities = 1,
  dispatch,
  color,
  price,
  discount,
  thumb,
  pid,
  title,
  key,
}) => {
  const [quantity, setQuantity] = useState(() => quantities);

  const handleQuantity = (number) => {
    if (+number > 1) setQuantity(number);
  };

  const handleChangeQuantity = useCallback(
    (flag) => {
      if (flag === "minus" && quantity === 1) {
        return;
      }
      if (flag === "minus") {
        setQuantity((prev) => +prev - 1);
      }
      if (flag === "plus") {
        setQuantity((prev) => +prev + 1);
      }
    },
    [quantity]
  );

  useEffect(() => {
    dispatch(updateCart({ pid, quantity, color }));
  }, [quantity, dispatch]);

  const removeCart = async (pid, color) => {
    const response = await apiRemoveCart(pid, color);
    if (response.success) {
      dispatch(getCurrent());
    } else toast.error(response.message);
  };

  return (
    <tr key={key}>
      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
        <div className="flex flex-col sm:flex-row gap-2 cursor-pointer">
          <img
            src={thumb}
            alt="thumb"
            className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
          />
          <div className="flex flex-col items-start gap-1">
            <span
              onClick={() => navigate(`/${convertToSlug(category)}/${pid}`)}
              className="text-main text-sm hover:text-black"
            >
              {title}
            </span>
            <span className="text-xs">{color.title}</span>
            <span onClick={() => removeCart(pid, color._id)}>
              <ImBin
                className="text-gray-500 hover:text-red-500 cursor-pointer"
                size={16}
              />
            </span>
          </div>
        </div>
      </td>
      <td>
        <span className="w-full text-center">
          <div className="flex items-center justify-center h-full">
            <SelectQuantity
              quantity={quantity}
              handleQuantity={handleQuantity}
              handleChangeQuantity={handleChangeQuantity}
            />
          </div>
        </span>
      </td>
      <td>
        <span className=" w-full h-full flex items-center justify-center text-center">
          <span className="text-sm">
            {formatMoney(discount ? discount : price) + " VNĐ"}
          </span>
        </span>
      </td>
      <td>
        <span className="w-full h-full flex items-center justify-center text-center">
          <span className="text-sm ">
            {formatMoney((discount ? discount : price) * quantity) + " VNĐ"}
          </span>
        </span>
      </td>
    </tr>
  );
};

export default withBase(CartItem);
