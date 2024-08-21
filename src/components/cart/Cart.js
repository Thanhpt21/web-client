import ButtonField from "components/button/ButtonField";
import withBase from "hocs/withBase";
import React, { memo, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { showCart } from "store/app/appSlice";
import { convertToSlug, formatMoney } from "utils/helpers";
import { ImBin } from "react-icons/im";
import { getCurrent } from "store/user/userActions";
import { toast } from "react-toastify";
import { apiRemoveCart } from "apis";
import path from "utils/path";

const Cart = ({ dispatch, navigate }) => {
  const { currentCart } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getCurrent());
  }, [dispatch]);

  const removeCart = async (pid, color) => {
    const response = await apiRemoveCart(pid, color);
    if (response.success) {
      dispatch(getCurrent());
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-[320px] h-screen bg-white text-black p-3 grid grid-rows-10 fixed shadow-lg"
    >
      <header className="row-span-1 h-full border-b border-gray-100 flex items-center justify-between">
        <span>Giỏ hàng</span>
        <span
          onClick={() => dispatch(showCart())}
          className="cursor-pointer p-2"
        >
          <IoMdClose size={24} />
        </span>
      </header>
      <section className="row-span-6 flex flex-col gap-3 h-full max-h-full overflow-y-auto py-3">
        {!currentCart && (
          <span className="text-sm italic">Giỏ hàng đang trống</span>
        )}
        {currentCart &&
          currentCart?.map((el) => (
            <div
              className="flex justify-between items-center cursor-pointer"
              key={el._id}
            >
              <div className="flex gap-2">
                <img
                  src={el?.thumb}
                  alt="thumb"
                  className="w-16 h-16 object-cover"
                />
                <div className="flex flex-col gap-1">
                  <span
                    onClick={() =>
                      navigate(
                        `/${convertToSlug(el.product.category.title)}/${
                          el.product._id
                        }`
                      )
                    }
                    className="font-sm text-gray-600 hover:text-black"
                  >
                    {el?.title}
                  </span>
                  <span className="flex gap-1">
                    <span className="text-xs">{el?.color?.title}</span>
                    <span className="text-xs">{`- SL: ${el?.quantity}`}</span>
                  </span>
                  <span className="flex gap-1 items-center">
                    <span className="text-sm">
                      {formatMoney(el?.discount ? el?.discount : el?.price) +
                        " VNĐ"}
                    </span>
                    {el?.discount ? (
                      <span className="text-xs line-through text-gray-600">
                        {formatMoney(el?.price) + " VNĐ"}
                      </span>
                    ) : null}
                  </span>
                </div>
              </div>
              <span onClick={() => removeCart(el.product._id, el?.color?._id)}>
                <ImBin
                  className="text-gray-500 hover:text-red-500 cursor-pointer"
                  size={16}
                />
              </span>
            </div>
          ))}
      </section>
      <div className="row-span-3 flex flex-col justify-between h-full ">
        <div className="flex items-center justify-between pt-4 border-t">
          <span>Tổng:</span>
          <span>
            {formatMoney(
              currentCart?.reduce(
                (sum, el) =>
                  sum +
                  Number(el?.discount ? el?.discount : el?.price) * el.quantity,
                0
              )
            ) + " VNĐ"}
          </span>
        </div>
        <span className="text-center text-gray-500 italic text-xs">
          Tiền vận chuyển, khuyến mãi được tính lúc thanh toán
        </span>
        <div className="flex justify-between items-center">
          <ButtonField
            handleOnClick={() => {
              dispatch(showCart());
              navigate(`/${path.DETAIL_CART}`);
            }}
            className="rounded-none w-full bg-main py-3"
          >
            Giỏ hàng
          </ButtonField>
          <ButtonField
            handleOnClick={() => {
              dispatch(showCart());
              navigate(`/${path.CHECKOUT}`);
            }}
            className="rounded-none w-full bg-main py-3"
          >
            Thanh toán
          </ButtonField>
        </div>
      </div>
    </div>
  );
};

export default withBase(memo(Cart));
