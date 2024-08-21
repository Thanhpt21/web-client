import React from "react";
import { useSelector } from "react-redux";
import { formatMoney } from "utils/helpers";
import { Link } from "react-router-dom";
import path from "utils/path";
import { CartItem } from "components";
import withBase from "hocs/withBase";

const MyCart = (props) => {
  const { currentCart } = useSelector((state) => state.user);

  return (
    <div className="w-full px-4">
      <header className="py-4 text-center md:text-start">Giỏ hàng</header>
      <div className="overflow-x-auto py-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Sản phẩm
              </th>

              <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                Số lượng
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                Đơn giá
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                Tổng cộng
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentCart?.map((el) => (
              <CartItem
                color={el.color}
                quantities={el.quantity}
                key={el?._id}
                title={el.title}
                thumb={el.thumb}
                price={el.price}
                pid={el.product?._id}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full flex flex-col my-4 justify-center items-end gap-2 overflow-x-auto">
        <div className="flex items-center justify-between">
          <span>Tổng: </span>
          <span>
            {formatMoney(
              currentCart?.reduce(
                (sum, el) => sum + Number(el.price) * el.quantity,
                0
              )
            ) + " VNĐ"}
          </span>
        </div>
        <span className="text-center text-gray-500 italic text-xs">
          Tiền vận chuyển, khuyến mãi được tính lúc thanh toán
        </span>
        <Link
          className="bg-main text-white px-4 py-2 rounded-md block w-full md:w-auto text-center"
          to={`/${path.CHECKOUT}`}
        >
          Đặt hàng
        </Link>
      </div>
    </div>
  );
};

export default withBase(MyCart);
