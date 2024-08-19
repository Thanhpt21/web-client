import React, { memo } from "react";
import { formatMoney } from "../../utils/helpers";
import new1 from "../../assets/new1.png";
import trending from "../../assets/trending.png";
import { renderStarFromNumber } from "../../utils/helpers";
import SelectOption from "../select/SelectOption";
import icons from "../../utils/icons";
import noimg from "../../assets/no-image.png";
import path from "utils/path";
import withBase from "hocs/withBase";
import { apiUpdateCart, apiUpdateWishlist } from "apis";
import { toast } from "react-toastify";
import { getCurrent } from "store/user/userActions";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { createSearchParams } from "react-router-dom";
import clsx from "clsx";
import { convertToSlug } from "../../utils/helpers";
import { FaTrashAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

const {
  AiFillEye,
  MdAddShoppingCart,
  BsFillSuitHeartFill,
  BsFillCartCheckFill,
} = icons;

const ProductFrame = ({
  data,
  isNew,
  normal,
  navigate,
  dispatch,
  location,
  pid,
  className,
  showTrash = false,
}) => {
  const { current } = useSelector((state) => state.user);

  const handleClickOption = async (e, flag) => {
    e.stopPropagation();
    if (flag === "CART") {
      if (!current) {
        return Swal.fire({
          title: "Thông báo",
          text: "Vui lòng đăng nhập trước",
          icon: "info",
          confirmButtonText: "Đăng nhập",
          showCancelButton: true,
          cancelButtonText: "Không phải bây giờ",
        }).then((rs) => {
          if (rs.isConfirmed)
            navigate({
              pathname: `/${path.LOGIN}`,
              search: createSearchParams({
                redirect: location.pathname,
              }).toString(),
            });
        });
      }
      const response = await apiUpdateCart({
        pid: data?._id,
        color: data?.color,
        quantity: 1,
        price: data?.price,
        thumb: data?.thumb,
        title: data?.title,
      });
      if (response.success) {
        toast.success(response.message);
        dispatch(getCurrent());
      } else toast.error(response.message);
    }
    if (flag === "WISHLIST") {
      if (!current) {
        return Swal.fire({
          title: "Thông báo",
          text: "Vui lòng đăng nhập trước",
          icon: "info",
          confirmButtonText: "Đăng nhập",
          showCancelButton: true,
          cancelButtonText: "Không phải bây giờ",
        }).then((rs) => {
          if (rs.isConfirmed)
            navigate({
              pathname: `/${path.LOGIN}`,
              search: createSearchParams({
                redirect: location.pathname,
              }).toString(),
            });
        });
      }
      const response = await apiUpdateWishlist(pid);
      if (response.success) {
        dispatch(getCurrent());
        toast.success(response.message);
      } else toast.error(response.message);
    }
  };

  const handleRemoveWishlist = async (e) => {
    e.stopPropagation();
    const response = await apiUpdateWishlist(pid, { remove: true });
    if (response.success) {
      dispatch(getCurrent());
      toast.success(response.message);
    } else toast.error(response.message);
  };

  // Tính toán phần trăm giảm giá
  const price = data?.price;
  const discount = data?.discount;
  const discountPercentage =
    price && discount ? Math.round(((price - discount) / price) * 100) : null;

  return (
    <div
      className={clsx(
        "w-full border rounded-md shadow-md p-2 flex flex-col items-center h-[340px]",
        className
      )}
      onClick={() =>
        navigate(`/${convertToSlug(data?.category?.title)}/${data?._id}`)
      }
    >
      <div className="w-full relative">
        {/* Icon thùng rác điều kiện */}
        {showTrash && (
          <span
            title="Xóa khỏi danh sách yêu thích"
            className="absolute top-8 right-2 text-red-500 cursor-pointer"
            onClick={handleRemoveWishlist}
          >
            <FaTrashAlt />
          </span>
        )}

        {/* Các tùy chọn khác hiển thị khi hover */}
        <div className="absolute bottom-[-10px] flex justify-center left-0 right-0 gap-2 animate-slide-top">
          {current?.cart?.some(
            (el) => el.product?._id === data._id.toString()
          ) ? (
            <span title="Sản phẩm có trong giỏ hàng">
              <SelectOption icon={<BsFillCartCheckFill color="green" />} />
            </span>
          ) : (
            <span
              title="Thêm vào giỏ hàng"
              onClick={(e) => handleClickOption(e, "CART")}
            >
              <SelectOption icon={<MdAddShoppingCart />} />
            </span>
          )}
          <span
            title="Yêu thích"
            onClick={(e) => handleClickOption(e, "WISHLIST")}
          >
            <SelectOption
              icon={
                <BsFillSuitHeartFill
                  color={
                    current?.wishlist?.some((el) => el._id === pid)
                      ? "red"
                      : "gray"
                  }
                />
              }
            />
          </span>
        </div>

        <img
          src={data?.thumb ? data?.thumb : noimg}
          className="w-full h-[200px] object-contain"
          alt=""
        />
        {/* {!normal && (
          <img
            src={isNew ? new1 : trending}
            className="absolute top-0 right-0 w-[70px] h-[25px] object-cover"
            alt="label"
          />
        )} */}
        {isNew && (
          <span className=" absolute top-0 right-0 w-[70px] h-[25px] bg-red-500 text-white px-2 py-1 rounded-sm text-xs">
            Mới
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1 mt-[15px] items-start w-full">
        <span className="line-clamp-2 text-gray-600 hover:text-black cursor-pointer text-[12px]">
          {data?.title}
        </span>
        <span className="flex items-center gap-2">
          {/* Hiển thị sao */}

          {data?.totalratings > 0 ? (
            renderStarFromNumber(data?.totalratings)?.map((el, index) => (
              <span key={index}>{el}</span>
            ))
          ) : (
            <div className="flex gap-1">
              <AiOutlineStar color="orange" />
              <AiOutlineStar color="orange" />
              <AiOutlineStar color="orange" />
              <AiOutlineStar color="orange" />
              <AiOutlineStar color="orange" />
            </div>
          )}
        </span>
        <span className="flex flex-col items-start gap-1">
          {/* Hiển thị giá giảm và giá gốc */}
          {discount ? (
            <>
              <div className="flex items-center gap-2">
                <span className="text-red-500">{`${formatMoney(
                  discount
                )}đ`}</span>
                {discountPercentage !== null && (
                  <span className="border border-red-500 text-red-500 bg-[#F8E5E5] px-2 py-1 rounded-sm text-xs">
                    - {discountPercentage}%
                  </span>
                )}
              </div>

              <span className="text-gray-500 line-through text-sm">
                {`${formatMoney(price)} đ`}
              </span>
            </>
          ) : (
            <span className="text-gray-800">{`${formatMoney(price)} đ`}</span>
          )}
        </span>
      </div>
    </div>
  );
};

export default withBase(memo(ProductFrame));
