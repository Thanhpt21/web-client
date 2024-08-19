import React, { useCallback, useEffect, useRef, useState } from "react";
import { createSearchParams, NavLink, useParams } from "react-router-dom";
import { apiUpdateCart, getProduct, getProducts } from "../../apis";
import {
  Breadcrumbs,
  ButtonField,
  SelectQuantity,
  ProductExtraInfo,
  ProductInfo,
  CustomSlider,
  TagProduct,
} from "../../components";
import Slider from "react-slick";
import DOMPurify from "dompurify";

import {
  convertToSlug,
  formatMoney,
  formatPrice,
  renderStarFromNumber,
} from "../../utils/helpers";
import { productExtraInfo } from "../../utils/contants";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { getCurrent } from "store/user/userActions";
import path from "utils/path";
import withBase from "hocs/withBase";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import ClipboardJS from "clipboard";
import { AiOutlineStar } from "react-icons/ai";
import { apigetAllCoupon } from "apis/coupon";
import { RiCoupon2Line } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
};

const ProductDetail = ({ isQuickView, data, location, navigate, dispatch }) => {
  const titleRef = useRef();
  const { current } = useSelector((state) => state.user);
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relativeProduct, setrelativeProduct] = useState(null);
  const [imgCurrent, setImgCurrent] = useState(null);
  const [updatedProduct, setupdatedProduct] = useState(false);
  const [variant, setVariant] = useState(null);
  const [pid, setpid] = useState(null);
  const [category, setcategory] = useState(null);
  const [coupon, setCoupon] = useState(null);
  const [currentProduct, setCurrentProduct] = useState({
    title: "",
    price: "",
    discount: "",
    color: "",
    images: [],
    thumb: "",
  });

  const [isSidebarCoupon, setSidebarCoupon] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  useEffect(() => {
    // Khởi tạo ClipboardJS khi component được mount
    const clipboard = new ClipboardJS(".copy-btn", {
      text: (trigger) => {
        return trigger.getAttribute("data-clipboard-text");
      },
    });

    clipboard.on("success", (e) => {
      setCopiedIndex(e.trigger.dataset.index);
      // setTimeout(() => {
      //   setCopiedIndex(null);
      // }, 2000); // Khôi phục trạng thái sau 2 giây
    });

    clipboard.on("error", (e) => {
      console.error("Failed to copy text: ", e);
    });

    return () => clipboard.destroy(); // Dọn dẹp khi component unmount
  }, []);

  const toggleSidebarCoupon = () => setSidebarCoupon(!isSidebarCoupon);

  useEffect(() => {
    if (data && data.pid) {
      setpid(data.pid);
      setcategory(data.category._id);
    } else if (params && params.pid) {
      setpid(params.pid);
      setcategory(params.category);
    }
  }, [data, params]);

  useEffect(() => {
    if (variant) {
      setCurrentProduct({
        title: product?.variants?.find((el) => el.sku === variant)?.title,
        price: product?.variants?.find((el) => el.sku === variant)?.price,
        discount: product?.variants?.find((el) => el.sku === variant)?.discount,
        color: product?.variants?.find((el) => el.sku === variant)?.color?._id,
        thumb: product?.variants?.find((el) => el.sku === variant)?.thumb,
        images: product?.variants?.find((el) => el.sku === variant)?.images,
      });
      setImgCurrent(product?.variants?.find((el) => el.sku === variant)?.thumb);
    } else {
      setCurrentProduct({
        title: product?.title,
        price: product?.price,
        discount: product?.discount,
        color: product?.color?._id,
        thumb: product?.thumb,
        images: product?.images || [],
      });
      setImgCurrent(product?.thumb);
    }
  }, [variant, product]);

  const handleQuantity = useCallback(
    (number) => {
      if (!Number(number) || Number(number) < 1) {
        return;
      } else {
        setQuantity(number);
      }
    },
    [quantity]
  );

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

  const fetchProduct = async () => {
    const response = await getProduct(pid);
    if (response.success) {
      setProduct(response.productData);
      setImgCurrent(response.productData?.thumb);
    }
  };

  // const fetchProducts = async () => {
  //   const response = await getProducts({ category });
  //   if (response.success) {
  //     setrelativeProduct(response.products);
  //   }
  // };

  const fetchCoupon = async () => {
    const response = await apigetAllCoupon();
    if (response.success) {
      setCoupon(response.coupons);
    }
  };

  useEffect(() => {
    if (pid) {
      fetchProduct();
      //fetchProducts();
    }
    fetchCoupon();
    window.scrollTo(0, 0);
    titleRef?.current?.scrollIntoView({ block: "center" });
  }, [pid]);

  useEffect(() => {
    if (pid) {
      fetchProduct();
    }
  }, [updatedProduct]);

  const reRender = useCallback(() => {
    setupdatedProduct(!updatedProduct);
  });

  const handleAddCart = async () => {
    if (!current)
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
    const response = await apiUpdateCart({
      pid: product?._id,
      color: currentProduct?.color,
      quantity,
      price: currentProduct?.price,
      discount: currentProduct?.discount,
      thumb: currentProduct?.thumb,
      title: currentProduct?.title,
    });

    if (response.success) {
      toast.success(response.message);
      dispatch(getCurrent());
    } else toast.error(response.message);
  };

  const handleBuyNow = async () => {
    await handleAddCart();
    setTimeout(() => {
      navigate(`/${path.CHECKOUT}`);
    }, 500);
  };

  const handleClickImg = (e, el) => {
    e.stopPropagation();
    setImgCurrent(el);
  };

  const categorySlug = product?.category?.title
    ? convertToSlug(product.category.title)
    : "";

  const handleBrandClick = (brandId) => {
    // Cập nhật URL với tham số brand
    if (categorySlug !== null) {
      navigate({
        pathname: `/${categorySlug}`, // Đường dẫn danh mục hiện tại
        search: createSearchParams({
          page: 1,
          brand: brandId, // Thêm brandId vào tham số query
        }).toString(),
      });
    }
  };

  return (
    <div className={clsx("w-full")}>
      <div ref={titleRef} className="py-4 flex justify-center items-center">
        <div className="w-full">
          <Breadcrumbs
            title={currentProduct?.title || product?.title}
            category={product?.category?.title}
          />
        </div>
      </div>

      <div
        onClick={(e) => e.stopPropagation()}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <div className="md:col-span-2 bg-white rounded-md shadow-md p-3">
          <img src={imgCurrent} className="w-full object-cover p-5" alt="" />
          <div className="w-full">
            <Slider {...settings} className="image-slider">
              {currentProduct?.images?.length === 0 &&
                product?.images?.map((el, index) => (
                  <div
                    className="mx-1"
                    key={index}
                    style="width: fit-content;display: inline-block;"
                  >
                    <img
                      onClick={(e) => handleClickImg(e, el)}
                      src={el}
                      className="w-[100px] h=[100px] object-cover border"
                      alt=""
                    />
                  </div>
                ))}
              {currentProduct?.images.length > 0 &&
                currentProduct?.images?.map((el, index) => (
                  <div
                    style="width: fit-content;display: inline-block;"
                    className="mx-1"
                    key={index}
                  >
                    <img
                      onClick={(e) => handleClickImg(e, el)}
                      src={el}
                      className="w-[100px] h=[100px] object-cover border"
                      alt=""
                    />
                  </div>
                ))}
              <div
                className="mx-1"
                style="width: fit-content;display: inline-block;"
              >
                <img
                  onClick={(e) =>
                    handleClickImg(
                      e,
                      currentProduct?.thumb
                        ? currentProduct?.thumb
                        : product?.thumb
                    )
                  }
                  src={
                    currentProduct?.thumb
                      ? currentProduct?.thumb
                      : product?.thumb
                  }
                  className="w-[100px] h=[100px] object-cover border"
                  alt=""
                />
              </div>
            </Slider>
          </div>
        </div>
        <div className="md:col-span-2 bg-white rounded-md shadow-md p-3">
          <div className="flex flex-col gap-1">
            <div>
              <h3 className="font-semibold text-[24px]">
                {currentProduct?.title || product?.title}
              </h3>
            </div>
            <div className="flex items-center gap-1">
              {product?.totalratings > 0 ? (
                renderStarFromNumber(product?.totalratings, 24)?.map(
                  (el, i) => <span key={i}>{el}</span>
                )
              ) : (
                <div className="flex gap-1">
                  <AiOutlineStar color="orange" />
                  <AiOutlineStar color="orange" />
                  <AiOutlineStar color="orange" />
                  <AiOutlineStar color="orange" />
                  <AiOutlineStar color="orange" />
                </div>
              )}
              {/* <span className="text-sm text-main italic">
                ({`Đã bán: ${product?.sold}`})
              </span> */}
            </div>
            <div className="flex gap-4 items-center">
              <div className="flex gap-2 items-center">
                <span className=" text-gray-500 text-sm">Thương hiệu:</span>
                <div
                  onClick={() => handleBrandClick(product?.brand?._id)}
                  //to={`/${categorySlug}/${product.brand._id}`}
                  className="font-medium underline cursor-pointer hover:text-blue-500"
                >
                  {product?.brand?.title}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <span className="text-gray-500 text-sm">Danh mục:</span>

                  <NavLink
                    key={product?.category?._id}
                    to={`/${categorySlug}`}
                    className="font-medium underline cursor-pointer hover:text-blue-500"
                  >
                    {product?.category?.title}
                  </NavLink>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 text-sm">Mã SP: </span>
                <span className="">{`${product?.code}`}</span>
              </div>
            </div>

            <div className="flex items-center flex-wrap gap-2">
              {currentProduct?.discount || product?.discount ? (
                <>
                  <h2 className="text-[25px] font-semibold text-[#BD0000]">
                    {`${formatMoney(
                      formatPrice(
                        (currentProduct?.discount
                          ? currentProduct?.discount
                          : currentProduct?.price) ||
                          (product?.discount
                            ? product?.discount
                            : product?.price)
                      )
                    )} VNĐ`}
                  </h2>
                  {currentProduct?.discount === 0 ||
                  currentProduct?.discount === undefined ? (
                    <h2></h2>
                  ) : (
                    <h2 className="text-[15px] text-medium text-gray-600 line-through">
                      {`${formatMoney(
                        formatPrice(currentProduct?.price || product?.price)
                      )} VNĐ`}
                    </h2>
                  )}
                  {currentProduct?.discount === 0 ||
                  currentProduct?.discount === undefined ? (
                    <div></div>
                  ) : (
                    <div className="bg-[#DFD4C4] text-red-600 px-2 rounded-sm">
                      {(() => {
                        const price = currentProduct?.price || product?.price;
                        const discount =
                          currentProduct?.discount || product?.discount;
                        if (price && discount) {
                          const discountPercentage = Math.round(
                            ((price - discount) / price) * 100
                          );
                          return `- ${discountPercentage}%`;
                        }
                        return "";
                      })()}
                    </div>
                  )}
                </>
              ) : (
                <h2 className="text-[25px] font-semibold">
                  {`${formatMoney(
                    formatPrice(currentProduct?.price || product?.price)
                  )} VNĐ`}
                </h2>
              )}
            </div>

            <div className="flex items-center">
              <span className="text-sm text-gray-500">Tình trạng: </span>
              <span className=" font-medium">{`${product?.status}`}</span>
            </div>
            {/* <div className="flex flex-col">
              <span className="font-medium">Mô tả:</span>

              <div className=" text-gray-600 text-sm">
                {product?.description && (
                  <div
                    className="text-sm line-clamp-2"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(product?.description),
                    }}
                  ></div>
                )}
                <a className="italic" href="#desc">
                  xem thêm
                </a>
              </div>
            </div> */}

            <div className="mt-2 flex flex-col gap-2">
              <span className="text-sm text-gray-500">Màu sắc:</span>
              <div className="flex flex-wrap gap-4 items-center w-full">
                <div
                  onClick={() => setVariant(null)}
                  className={clsx(
                    "flex items-center gap-2 p-2 border cursor-pointer",
                    !variant && "border-red-500"
                  )}
                >
                  <img
                    src={product?.thumb || currentProduct?.thumb}
                    alt="thumb"
                    className="w-10 h-10 object-cover rounded-md"
                  />
                  <span className="flex flex-col ">
                    <span className="text-xs">
                      {product?.color?.title || currentProduct?.color?.title}
                    </span>
                    <span className="text-sm">
                      {(product?.discount
                        ? product?.discount
                        : product?.price) ||
                        (currentProduct?.discount
                          ? currentProduct?.discount
                          : currentProduct?.price)}
                    </span>
                  </span>
                </div>
                {product?.variants?.map((el) => (
                  <div
                    key={el.sku}
                    onClick={() => setVariant(el.sku)}
                    className={clsx(
                      "flex items-center gap-2 p-2 border cursor-pointer",
                      variant === el.sku && "border-red-500"
                    )}
                  >
                    <img
                      src={el?.thumb}
                      alt="thumb"
                      className="w-10 h-10 object-cover rounded-md"
                    />
                    <span className="flex flex-col ">
                      <span className="text-xs">{el?.color?.title}</span>
                      <span className="text-sm">
                        {el?.discount ? el?.discount : el?.price}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <div className="flex items-center gap-4 ">
                <span className="text-sm text-gray-500">Số lượng:</span>
                <SelectQuantity
                  quantity={quantity}
                  handleQuantity={handleQuantity}
                  handleChangeQuantity={handleChangeQuantity}
                />
              </div>
            </div>
            <div className="flex gap-4 my-2">
              <button
                className="px-4 py-2 bg-black text-white rounded-sm"
                onClick={handleAddCart}
              >
                Thêm vào giỏ hàng
              </button>
              <button
                className="px-4 py-2 bg-transparent border border-1 rounded-sm border-black hover:text-white hover:bg-black"
                onClick={handleBuyNow}
              >
                Mua ngay
              </button>
            </div>
            <TagProduct product={product} category={categorySlug} />
            <div className="flex flex-col gap-2">
              {productExtraInfo?.map((el) => (
                <ProductExtraInfo
                  key={el.id}
                  icon={el.icon}
                  title={el.title}
                  sub={el.sub}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 mt-4">
        {isSidebarCoupon && (
          <div className="absolute inset-0 z-50 flex justify-end">
            <div className="w-[350px] h-screen bg-white text-black p-6 grid grid-rows-10 fixed shadow-lg">
              <header className="border-b border-gray-100 flex items-center justify-between">
                <span>Mã giảm giá</span>
                <span
                  onClick={() => toggleSidebarCoupon()}
                  className="cursor-pointer p-2"
                >
                  <IoMdClose size={24} />
                </span>
              </header>
              <section>
                <div className="overflow-y-auto">
                  <div className="flex flex-col gap-4">
                    {coupon?.map((el, index) => (
                      <div
                        key={el.name}
                        className="bg-white shadow-sm rounded-md flex flex-col gap-2 border border-1 p-2"
                      >
                        <div className="font-medium">Mã: {el.name}</div>
                        <div className="text-gray-600 text-xs">
                          - Giảm {formatMoney(el.discount)} cho đơn hàng giá trị
                          tối thiểu {formatMoney(el.minPrice)}.
                          <br />- Tối đa 1 mã giảm giá/đơn hàng.
                        </div>
                        <div className="px-2 py-1 bg-transparent border border-1 border-black rounded-md  w-fit">
                          <button
                            className={`copy-btn ${
                              Number(copiedIndex) === Number(index)
                                ? " text-black"
                                : "text-gray-600"
                            }`}
                            data-clipboard-text={el.name}
                            data-index={index}
                          >
                            {Number(copiedIndex) === Number(index)
                              ? "Đã sao chép"
                              : "Sao chép"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}
        <div className="border border-1 border-gray-200 shadow-md rounded-md py-4 flex flex-col px-4">
          <div className="font-semibold text-[16px] pb-2">Mã giảm giá</div>
          <div className="flex gap-2 items-center">
            {coupon?.map((el) => (
              <div
                key={el._id}
                onClick={toggleSidebarCoupon}
                className="border border-1 rounded-md border-gray-300 py-1 px-2 w-fit flex gap-1 items-center cursor-pointer hover:border-gray-900"
              >
                <RiCoupon2Line /> {el.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 mt-4">
        <ProductInfo
          totalratings={product?.totalratings}
          ratings={product?.ratings}
          nameProduct={product?.title}
          pid={product?._id}
          reRender={reRender}
          description={product?.description}
        />
      </div>
    </div>
  );
};

export default withBase(ProductDetail);
