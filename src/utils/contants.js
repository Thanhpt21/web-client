import path from "./path";
import icons from "./icons";
import { RiCoupon2Line } from "react-icons/ri";
import { MdOutlineStorefront } from "react-icons/md";
import { IoStorefrontSharp } from "react-icons/io5";

const {
  BsShieldShaded,
  AiFillGift,
  RiTruckFill,
  BsReplyFill,
  FaTty,
  AiOutlineDashboard,
  MdGroups,
  MdProductionQuantityLimits,
  RiBillLine,
  BiCategory,
  BiCategoryAlt,
  PiNewspaperClippingLight,
  IoColorPaletteOutline,
  GrContact,
  IoSettingsOutline,
  CiMenuFries,
} = icons;

export const navigation = [
  {
    id: 1,
    type: "SINGLE",
    value: "Trang chủ",
    path: `/${path.HOME}`,
  },
  {
    id: 2,
    type: "PARENT",
    value: "Sản phẩm",
    path: `/${path.PRODUCTS}`,
    submenu: [
      {
        id: "669fc8b5db02ba4cd66b6cd7",
        value: "Tai nghe",
        path: `/tai-nghe`,
      },
      {
        id: "669a7aaea22cb6b2eaa130f6",
        value: "Airpord",
        path: `/airpord`,
      },
    ],
  },
  {
    id: 3,
    type: "SINGLE",
    value: "Tin tức",
    path: `/${path.BLOG}`,
  },
  {
    id: 4,
    type: "SINGLE",
    value: "Về chúng tôi",
    path: `/${path.ABOUT_US}`,
  },
  {
    id: 5,
    type: "SINGLE",
    value: "Liên hệ",
    path: `/${path.CONTACT}`,
  },
];

export const productExtraInfo = [
  {
    id: 1,
    title: "Đảm bảo",
    sub: "Đã kiểm tra chất lượng",
    icon: <BsShieldShaded />,
  },
  {
    id: 2,
    title: "Miễn phí vận chuyển",
    sub: "Miễn phí cho tất cả các sản phẩm",
    icon: <RiTruckFill />,
  },
  {
    id: 3,
    title: "Thẻ quà tặng ",
    sub: "Thẻ quà tặng đặc biệt",
    icon: <AiFillGift />,
  },
  {
    id: 4,
    title: "Miễn phí đổi trả",
    sub: "Trong vòng 7 ngày",
    icon: <BsReplyFill />,
  },
  {
    id: 5,
    title: "Tư vấn",
    sub: "Trọn đời, 24/7/365",
    icon: <FaTty />,
  },
];

export const productInfo = [
  {
    id: 2,
    title: "Bảo hành",
    content: "abc2",
  },
  {
    id: 3,
    title: "Vận chuyển",
    content: "abc3",
  },
  {
    id: 4,
    title: "Thanh toán",
    content: "abc4",
  },
];

export const arrColors = ["Đen", "Tím", "Vàng", "Xanh", "Đỏ"];

export const sortby = [
  {
    id: 1,
    value: "-sold",
    text: "Bán chạy nhất",
  },
  {
    id: 2,
    value: "-title",
    text: "Theo thứ tự A-Z",
  },
  {
    id: 3,
    value: "title",
    text: "Theo thứ tự Z-A",
  },
  {
    id: 4,
    value: "price",
    text: "Giá thấp đến cao",
  },
  {
    id: 5,
    value: "-price",
    text: "Giá cao đến thấp",
  },
  {
    id: 6,
    value: "-createdAt",
    text: "Mới đến cũ",
  },
  {
    id: 7,
    value: "createdAt",
    text: "Cũ đến mới",
  },
];

export const votes = [
  {
    id: 1,
    text: "Rất tệ",
  },
  {
    id: 2,
    text: "Tệ",
  },
  {
    id: 3,
    text: "Thường",
  },
  {
    id: 4,
    text: "Tốt",
  },
  {
    id: 5,
    text: "Rất tốt",
  },
];

export const adminSidebar = [
  {
    id: 1,
    type: "SINGLE",
    text: "Trang chủ",
    path: `/${path.ADMIN}/${path.DASHBOARD}`,
    icon: <AiOutlineDashboard />,
  },

  {
    id: 2,
    type: "SINGLE",
    text: "Tài khoản",
    path: `/${path.ADMIN}/${path.MANAGE_USER}`,
    icon: <MdGroups />,
  },
  {
    id: 3,
    type: "SINGLE",
    text: "Đơn hàng",
    path: `/${path.ADMIN}/${path.MANAGE_ORDER}`,
    icon: <RiBillLine />,
  },
  {
    id: 4,
    type: "PARENT",
    text: "Sản phẩm",
    icon: <MdProductionQuantityLimits />,
    submenu: [
      {
        text: "Tạo",
        path: `/${path.ADMIN}/${path.CREATE_PRODUCT}`,
      },
      {
        text: "Quản lý",
        path: `/${path.ADMIN}/${path.MANAGE_PRODUCT}`,
      },
    ],
  },
  {
    id: 5,
    type: "PARENT",
    text: "Danh mục",
    icon: <BiCategory />,
    submenu: [
      {
        text: "Tạo danh mục sản phẩm",
        path: `/${path.ADMIN}/${path.CREATE_CATEGORY_PRODUCT}`,
      },
      {
        text: "Quản lý danh mục sản phẩm",
        path: `/${path.ADMIN}/${path.MANAGE_CATEGORY_PRODUCT}`,
      },
      {
        text: "Tạo danh mục tin tức",
        path: `/${path.ADMIN}/${path.CREATE_CATEGORY_BLOG}`,
      },
      {
        text: "Quản lý danh mục tin tức",
        path: `/${path.ADMIN}/${path.MANAGE_CATEGORY_BLOG}`,
      },
    ],
  },

  {
    id: 6,
    type: "PARENT",
    text: "Tin tức",
    icon: <PiNewspaperClippingLight />,
    submenu: [
      {
        text: "Tạo",
        path: `/${path.ADMIN}/${path.CREATE_BLOG}`,
      },
      {
        text: "Quản lý",
        path: `/${path.ADMIN}/${path.MANAGE_BLOG}`,
      },
    ],
  },
  {
    id: 7,
    type: "PARENT",
    text: "Màu sắc",
    icon: <IoColorPaletteOutline />,
    submenu: [
      {
        text: "Tạo",
        path: `/${path.ADMIN}/${path.CREATE_COLOR}`,
      },
      {
        text: "Quản lý",
        path: `/${path.ADMIN}/${path.MANAGE_COLOR}`,
      },
    ],
  },
  {
    id: 8,
    type: "PARENT",
    text: "Marketing",
    icon: <RiCoupon2Line />,
    submenu: [
      {
        text: "Tạo mã giảm giá",
        path: `/${path.ADMIN}/${path.CREATE_COUPON}`,
      },
      {
        text: "Quản lý mã giảm giá",
        path: `/${path.ADMIN}/${path.MANAGE_COUPON}`,
      },
      {
        text: "Tạo phí ship",
        path: `/${path.ADMIN}/${path.CREATE_SHIP}`,
      },
      {
        text: "Quản lý phí ship",
        path: `/${path.ADMIN}/${path.MANAGE_SHIP}`,
      },
    ],
  },
  {
    id: 9,
    type: "SINGLE",
    text: "Hộp thư",
    path: `/${path.ADMIN}/${path.MANAGE_ENQUIRY}`,
    icon: <GrContact />,
  },
  {
    id: 10,
    type: "PARENT",
    text: "Thương hiệu",
    icon: <MdOutlineStorefront />,
    submenu: [
      {
        text: "Tạo",
        path: `/${path.ADMIN}/${path.CREATE_BRAND}`,
      },
      {
        text: "Quản lý",
        path: `/${path.ADMIN}/${path.MANAGE_BRAND}`,
      },
    ],
  },
  {
    id: 11,
    type: "PARENT",
    text: "Cài đặt",
    icon: <IoSettingsOutline />,
    submenu: [
      {
        text: "Cấu hình",
        path: `/${path.ADMIN}/${path.CREATE_CONFIG}`,
      },
      {
        text: "Menu",
        path: `/${path.ADMIN}/${path.CREATE_MENU}`,
      },
    ],
  },
  {
    id: 12,
    type: "PARENT",
    text: "Chi nhánh",
    icon: <IoStorefrontSharp />,
    submenu: [
      {
        text: "Tạo",
        path: `/${path.ADMIN}/${path.CREATE_RETAIL}`,
      },
      {
        text: "Quản lý",
        path: `/${path.ADMIN}/${path.MANAGE_RETAIL}`,
      },
    ],
  },
];

export const memberSidebar = [
  {
    id: 1,
    type: "SINGLE",
    text: "Thông tin cá nhân",
    path: `/${path.MEMBER}/${path.PERSONAL}`,
    icon: <AiOutlineDashboard />,
  },
  {
    id: 2,
    type: "SINGLE",
    text: "Giỏ hàng của tôi",
    path: `/${path.MEMBER}/${path.MY_CART}`,
    icon: <MdGroups />,
  },
  {
    id: 3,
    type: "SINGLE",
    text: "Lịch sử mua hàng",
    path: `/${path.MEMBER}/${path.HISTORY}`,
    icon: <RiBillLine />,
  },
  {
    id: 4,
    type: "SINGLE",
    text: "Danh sách yêu thích",
    path: `/${path.MEMBER}/${path.WISHLIST}`,
    icon: <RiBillLine />,
  },
];

export const roles = [
  {
    code: 1,
    value: "Admin",
  },
  {
    code: 2,
    value: "User",
  },
];

export const block = [
  {
    code: 1,
    value: "Kích hoạt",
  },
  {
    code: 2,
    value: "Khóa",
  },
];

export const statusOrder = [
  {
    label: "Đã hủy",
    value: "Đã hủy",
    color: "error",
  },
  {
    label: "Thành công",
    value: "Thành công",
    color: "success",
  },
  {
    label: "Đang chờ duyệt",
    value: "Đang chờ duyệt",
    color: "warning",
  },
  {
    label: "Đang giao hàng",
    value: "Đang giao hàng",
    color: "processing",
  },
];

export const statusProduct = [
  {
    color: "1",
    value: "Còn hàng",
  },
  {
    color: "2",
    value: "Hết hàng",
  },
];

export const statusEnquiry = [
  {
    label: "Đã hủy",
    value: "Đã hủy",
    color: "error",
  },
  {
    label: "Đã liên lạc",
    value: "Đã liên lạc",
    color: "success",
  },
  {
    label: "Đang chờ",
    value: "Đang chờ",
    color: "processing",
  },
];

export const typeMenu = [
  {
    code: "SINGLE",
    value: "SINGLE",
  },
  {
    code: "PARENT",
    value: "PARENT",
  },
];
