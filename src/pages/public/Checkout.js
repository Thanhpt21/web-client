import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { convertToSlug, formatMoney } from "utils/helpers";
import { ButtonField, InputForm, RadioField, SelectField } from "components";
import { useForm } from "react-hook-form";
import { apiCreateOrder } from "apis/order";
import Swal from "sweetalert2";
import withBase from "hocs/withBase";
import { getCurrent } from "store/user/userActions";
import { Link } from "react-router-dom";
import path from "utils/path";
import { apigetAllCoupon, apiUpdateUsedCount, apiUseCoupon } from "apis/coupon";
import { toast } from "react-toastify";
import moment from "moment";
import { apigetAllShips } from "apis/ship";

const Checkout = ({ dispatch, navigate }) => {
  const { currentCart, current } = useSelector((state) => state.user);

  const [deliveryCost, setDeliveryCost] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [couponData, setCounponData] = useState(null);
  const [couponName, setCouponName] = useState("");
  const [couponIdused, setCouponIdUsed] = useState(null);
  const [shipData, setShipData] = useState(null);
  const [shipId, setShipId] = useState(null);
  const [discountCoupon, setDiscountCoupon] = useState(null);
  const [isProvinceHide, setIsProvinceHide] = useState(false);

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
  } = useForm();

  const address = watch("address");
  const ship = watch("ship");

  useEffect(() => {
    setValue("mobile", current?.mobile);
    setValue("firstname", current?.firstname);
    setValue("lastname", current?.mobile);
    setValue("email", current?.email);
  }, []);

  useEffect(() => {
    reset({
      firstname: current?.firstname,
      lastname: current?.lastname,
      email: current?.email,
      mobile: current?.mobile,
      avatar: current?.avatar,
      address: current?.address,
    });
    fetchCoupon();
    fetchShip();
  }, []);

  const fetchCoupon = async () => {
    const response = await apigetAllCoupon();
    if (response.success) {
      setCounponData(response.coupons);
    }
  };

  const fetchShip = async () => {
    const response = await apigetAllShips();
    if (response.success) {
      setShipData(response.ships);
    }
  };

  const handleCouponInputChange = (e) => {
    setCouponName(e.target.value); // Hàm xử lý khi input thay đổi
  };

  const handleDeliveryMethodChange = (selectedOption) => {
    if (selectedOption === "express") {
      setIsProvinceHide(true);
      setDeliveryCost(25000);
      clearErrors("ship");
    } else if (selectedOption === "province") {
      setIsProvinceHide(false);
    }
  };

  const handlePaymentMethodChange = (selectedOption) => {
    setPaymentMethod(selectedOption);
  };

  const handleShipChange = (event) => {
    const selectedShipId = event.target.value;
    const selectedShip = shipData?.find((ship) => ship._id === selectedShipId);

    if (selectedShip) {
      setDeliveryCost(selectedShip.price);
      setShipId(selectedShip._id);
    }
  };

  useEffect(() => {
    if (!isProvinceHide) {
      const selectedShip = shipData?.find((ship) => ship._id === shipId);
      setDeliveryCost(selectedShip?.price || 0);
    } else {
      setDeliveryCost(25000);
    }
  }, [isProvinceHide, shipId, shipData]);

  const handleUseCoupon = async (e) => {
    e.preventDefault(); // Ngăn chặn sự kiện submit mặc định của form

    if (!couponName) {
      toast.error("Vui lòng nhập mã giảm giá");
      return;
    }

    const normalizedCouponName = couponName.trim().toUpperCase();
    const coupon = couponData?.find((el) => el.name === normalizedCouponName);

    if (coupon) {
      if (moment().isAfter(coupon.expiry)) {
        toast.error("Mã giảm giá đã hết hạn sử dụng");
        return;
      }

      const totalWithoutDiscount = currentCart?.reduce(
        (sum, el) =>
          sum + Number(el.discount ? el.discount : el.price) * el.quantity,
        0
      );

      if (totalWithoutDiscount < coupon.minPrice) {
        toast.error(
          `Giá trị đơn hàng phải lớn hơn ${formatMoney(
            coupon.minPrice
          )} mới có thể sử dụng mã giảm giá này`
        );
        return;
      }

      try {
        const response = await apiUseCoupon(coupon._id);

        if (response.success) {
          // Lưu couponId tạm thời
          setDiscountCoupon(coupon.discount);
          setCouponIdUsed(response.couponId); // Sử dụng couponId từ phản hồi
          toast.success("Đã áp dụng mã giảm giá thành công");
        } else {
          toast.error(response.message || "Đã xảy ra lỗi");
        }
      } catch (error) {
        toast.error("Đã xảy ra lỗi khi áp dụng mã giảm giá");
      }
    } else {
      toast.info("Mã giảm giá không tồn tại");
    }

    setCouponName(""); // Xóa giá trị trong input sau khi sử dụng
  };
  const handleOrder = async () => {
    const discount = discountCoupon ? discountCoupon : 0;
    const totalWithoutDiscount = currentCart?.reduce(
      (sum, el) =>
        sum + Number(el.discount ? el.discount : el.price) * el.quantity,
      0
    );
    const total = totalWithoutDiscount - (discount || 0) + deliveryCost;

    const payload = {
      products: currentCart,
      total,
      orderBy: current?._id,
      address,
      methodPayment: paymentMethod,
      deliveryMethod: isProvinceHide ? "Ship siêu tốc" : "Ship theo tỉnh thành",
      ship: isProvinceHide ? null : shipId,
    };
    if (couponIdused) {
      payload.coupon = couponIdused;
    }
    try {
      const response = await apiCreateOrder(payload);
      if (response.success) {
        // Cập nhật coupon's usedCount
        if (couponIdused) {
          await apiUpdateUsedCount(couponIdused);
        }
        dispatch(getCurrent());
        setTimeout(() => {
          Swal.fire(
            "Chúc mừng",
            "Đơn hàng được đặt thành công",
            "success"
          ).then(() => {
            navigate(`/${path.HOME}`);
          });
        }, 500);
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi đặt hàng");
    }
  };

  return (
    <div className="w-full py-8 grid grid-cols-1 md:grid-cols-2 h-full gap-2">
      <div className="grid  md:col-span-1">
        <form className="w-full mx-auto flex flex-col gap-4 border p-2">
          <div className="text-medium">Thông tin khách hàng</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <InputForm
              label={"Họ"}
              register={register}
              errors={errors}
              id="lastname"
              validate={{
                required: "Vui lòng nhập họ của bạn",
              }}
              placeholder={"Vui lòng nhập họ của bạn"}
              style={"text-sm, w-full"}
              disabled={true}
            />
            <InputForm
              label={"Tên"}
              register={register}
              errors={errors}
              id="firstname"
              validate={{
                required: "Vui lòng nhập tên của bạn",
              }}
              placeholder={"Vui lòng nhập tên của bạn"}
              style={"text-sm, w-full"}
              disabled={true}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <InputForm
              label={"Email"}
              register={register}
              errors={errors}
              id="email"
              validate={{
                required: "Vui lòng nhập email",
                pattern: {
                  value: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/gm,
                  message: "Email không đúng định dạng",
                },
              }}
              placeholder={"Vui lòng nhập email"}
              style={"text-sm, w-full"}
              disabled={true}
            />
            <InputForm
              label={"Số điện thoại"}
              register={register}
              errors={errors}
              id="mobile"
              validate={{
                required: "Vui lòng nhập Số điện thoại",
                pattern: {
                  value:
                    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gm,
                  message: "Sdt không đúng định dạng",
                },
              }}
              placeholder={"Vui lòng nhập Số điện thoại"}
              style={"text-sm, w-full"}
              disabled={true}
            />
          </div>

          <InputForm
            label="Địa chỉ của bạn"
            register={register}
            errors={errors}
            id="address"
            validate={{
              required: "Vui lòng nhập Địa chỉ của bạn",
            }}
            placeholder="Vui lòng nhập Địa chỉ của bạn"
            style={"text-sm"}
          />
          {!isProvinceHide && (
            <SelectField
              label="Tỉnh thành"
              options={shipData?.map((el) => ({
                code: el._id,
                value: el.province,
              }))}
              register={register}
              style="flex-auto"
              id="ship"
              validate={{ required: "Vui lòng chọn tỉnh thành" }}
              errors={errors}
              fullwidth
              handleChange={handleShipChange}
            />
          )}
        </form>
        <div>
          <span className="italic"> Bạn muốn cập nhật lại thông tin mới, </span>
          <Link
            to={`/${path.MEMBER}/${path.PERSONAL}`}
            className="text-underline"
          >
            nhấn vào đây
          </Link>
        </div>
        <div className="">
          <div className="border flex flex-col gap-4 p-4">
            <div className="flex flex-col gap-2">
              <div className="text-medium uppercase">Phương thức giao hàng</div>
              <span>
                <RadioField
                  name="deliveryMethod"
                  selectedOption={isProvinceHide ? "express" : "province"}
                  option1={{ value: "province", label: "Ship theo tỉnh thành" }}
                  option2={{
                    value: "express",
                    label: "Ship siêu tốc - 25.000₫",
                  }}
                  onOptionChange={handleDeliveryMethodChange}
                />
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-medium uppercase">
                Phương thức thanh toán
              </div>
              <span>
                <RadioField
                  name="paymentMethod"
                  selectedOption={paymentMethod}
                  option1={{ value: "COD", label: "Thanh toán khi nhận hàng" }}
                  option2={{ value: "bank", label: "Chuyển khoản ngân hàng" }}
                  onOptionChange={handlePaymentMethodChange}
                />
              </span>
            </div>
            {paymentMethod === "bank" && (
              <div className="bg-gray-200 p-4 mt-4">
                <h2 className="text-gray-900 font-medium">
                  Thông tin chuyển khoản
                </h2>
                <p className="text-sm flex flex-col">
                  <b>Bạn vui lòng chuyển đủ số tiền vào tài khoản sau:</b>
                  <span>Ngân hàng Vietcombank</span>
                  <span>- Số tài khoản: 123242424</span>
                  <span>- Chủ tài khoản: ABCDEEEEEEEEEEE</span>
                  <span>- Chi nhánh: Hà Nội</span>
                  <span className="mt-2">
                    Sau khi nhận được tiền Elecshop sẽ chuyển hàng ngay cho bạn.
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:col-span-1">
        <div className="flex flex-col items-center gap-6">
          <h2 className="font-medium uppercase">Đơn hàng của bạn</h2>
          {current?.cart?.length !== 0 ? (
            <div>
              <div className=" py-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Sản phẩm
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                        Số lượng
                      </th>

                      <th className=" py-3 text-end text-xs font-medium uppercase tracking-wider">
                        Tổng cộng
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentCart?.map((el) => (
                      <tr key={el._id}>
                        <td className="flex gap-2">
                          <img
                            className="w-24  h-24 object-contain"
                            src={el.thumb}
                            alt={el.title}
                          />
                          <span className="flex flex-col gap-1">
                            <span
                              onClick={() =>
                                navigate(
                                  `/${convertToSlug(
                                    el.product.category.title
                                  )}/${el.product._id}`
                                )
                              }
                              className="cursor-pointer text-gray-600 hover:text-black"
                            >
                              {el.title}
                            </span>
                            <span className="text-sm text-gray-500">
                              ({el.color.title}) -{" "}
                              {formatMoney(
                                el.discount ? el.discount : el.price
                              )}
                            </span>
                          </span>
                        </td>
                        <td className="text-center p-2">{el.quantity}</td>

                        <td className="text-end ">
                          {formatMoney(
                            (el.discount ? el.discount : el.price) * el.quantity
                          ) + "đ"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="py-2 flex flex-col">
                {discountCoupon === null ? (
                  <div className="text-sm italic">
                    Bạn có mã giảm giá? Vui lòng nhập tại đây
                  </div>
                ) : null}

                {discountCoupon === null ? (
                  <form
                    className="flex items-center gap-2"
                    onSubmit={handleUseCoupon} // Gọi hàm xử lý khi form submit
                  >
                    <div>
                      <input
                        type="text"
                        value={couponName} // Giá trị của input là state couponName
                        onChange={handleCouponInputChange} // Hàm xử lý khi input thay đổi
                        placeholder="Nhập mã giảm giá"
                      />
                    </div>
                    <div className="">
                      <ButtonField type="submit">Sử dụng</ButtonField>
                    </div>
                  </form>
                ) : null}
              </div>
              <div className="flex flex-col gap-4 ">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Thành tiền: </span>
                    <span>
                      {formatMoney(
                        currentCart?.reduce(
                          (sum, el) =>
                            sum +
                            Number(el.discount ? el.discount : el.price) *
                              el.quantity,
                          0
                        )
                      ) + "đ"}
                    </span>
                  </div>
                  {discountCoupon !== null ? (
                    <div className="font-medium">
                      Giảm giá: - {formatMoney(discountCoupon) + "đ"}
                    </div>
                  ) : null}
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Tiền vận chuyển: </span>
                    <span>+ {formatMoney(deliveryCost) + "đ"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Tổng: </span>
                    <span>
                      {formatMoney(
                        currentCart?.reduce(
                          (sum, el) =>
                            sum +
                            Number(el.discount ? el.discount : el.price) *
                              el.quantity,
                          0
                        ) +
                          deliveryCost -
                          (discountCoupon || 0)
                      ) + " VNĐ"}
                    </span>
                  </div>
                </div>
                {address && (
                  <div className="flex gap-2">
                    <ButtonField
                      type="submit"
                      handleOnClick={handleSubmit(handleOrder)}
                    >
                      Đặt hàng
                    </ButtonField>
                  </div>
                )}
                <Link
                  className="bg-main text-white px-4 py-2 w-fit"
                  to={`/${path.DETAIL_CART}`}
                >
                  Quay lại giỏ hàng
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              Không có sản phẩm nào, vui lòng mua sản phẩm
              <Link
                className="bg-main text-white px-4 py-2 text-center"
                to={`/${path.PRODUCTS}`}
              >
                Tiếp tục mua hàng
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withBase(Checkout);
