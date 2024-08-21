import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import {
  AdminLayout,
  Dashboard,
  ListBaseOrder,
  ListBaseProduct,
  ListBaseUser,
  CreateProduct,
  ListBaseBlog,
  CreateBlog,
  ListBaseBlogCategory,
  CreateBlogCategory,
  ListBaseProductVariants,
  ListBaseColor,
  CreateColor,
  ListBaseEnquiry,
  CreateConfig,
  CreateMenu,
  ListBaseCoupon,
  CreateCoupon,
  PersonalAdmin,
} from "./pages/admin";

import {
  Personal,
  MemberLayout,
  History,
  Wishlist,
  MyCart,
} from "./pages/private";
import path from "./utils/path";
import {
  getCategories,
  getBlogCategories,
  getConfig,
  getMenus,
  getRetails,
} from "./store/app/appActions";
import { useDispatch, useSelector } from "react-redux";
import { Cart, Modal } from "./components";
import { showCart } from "store/app/appSlice";
import ListBaseCategory from "pages/admin/productCategory/ListBaseCategory";
import CreateCategory from "pages/admin/productCategory/CreateCategory";

import {
  AboutUs,
  Blog,
  BlogDetail,
  Contact,
  DetailCart,
  Home,
  Login,
  Product,
  ProductDetail,
  Public,
  Checkout,
} from "pages/public";
import AOS from "aos";
import "aos/dist/aos.css";
import ListBaseShip from "pages/admin/ship/ListBaseShip";
import CreateShip from "pages/admin/ship/CreateShip";
import ListBaseBrand from "pages/admin/brand/ListBaseBrand";
import CreateBrand from "pages/admin/brand/CreateBrand";
import ListBaseRetail from "pages/admin/retail/ListBaseRetail";
import CreateRetail from "pages/admin/retail/CreateRetail";

function App() {
  const dispatch = useDispatch();
  const { isShowModal, modalChildren, isShowCart } = useSelector(
    (state) => state.app
  );

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBlogCategories());
    dispatch(getMenus());
    dispatch(getConfig());
    dispatch(getRetails());
    AOS.init({
      duration: 2000,
      easing: "ease-in-sine",
      delay: 100,
      offset: 100,
    });
    AOS.refresh();
  }, []);
  return (
    <div className="">
      {isShowCart && (
        <div
          onClick={() => dispatch(showCart())}
          style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
          className="fixed inset-0 flex items-center justify-end z-50"
        >
          <Cart />
        </div>
      )}
      {isShowModal && <Modal>{modalChildren}</Modal>}

      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route
            path={path.DETAIL_PRODUCT_CATEGORY_PID}
            element={<ProductDetail />}
          />
          <Route path={path.BLOG} element={<Blog />} />
          <Route
            path={path.DETAIL_BLOG_CATEGORY_BID}
            element={<BlogDetail />}
          />
          <Route path={path.ABOUT_US} element={<AboutUs />} />
          <Route path={path.CONTACT} element={<Contact />} />
          <Route path={path.PRODUCTS_CATEGORY} element={<Product />} />

          <Route path={path.DETAIL_CART} element={<DetailCart />} />
          <Route path={path.CHECKOUT} element={<Checkout />} />
          <Route path={path.HOME} element={<Home />} />
        </Route>
        <Route path={path.ADMIN} element={<AdminLayout />}>
          <Route path={path.DASHBOARD} element={<Dashboard />} />
          <Route path={path.MANAGE_ORDER} element={<ListBaseOrder />} />
          <Route path={path.MANAGE_USER} element={<ListBaseUser />} />
          <Route path={path.MANAGE_PRODUCT} element={<ListBaseProduct />} />
          <Route
            path={path.MANAGE_PRODUCT_VARIANTS}
            element={<ListBaseProductVariants />}
          />
          <Route path={path.CREATE_PRODUCT} element={<CreateProduct />} />
          <Route path={path.MANAGE_BLOG} element={<ListBaseBlog />} />
          <Route path={path.CREATE_BLOG} element={<CreateBlog />} />
          <Route
            path={path.MANAGE_CATEGORY_BLOG}
            element={<ListBaseBlogCategory />}
          />
          <Route
            path={path.CREATE_CATEGORY_BLOG}
            element={<CreateBlogCategory />}
          />
          <Route
            path={path.MANAGE_CATEGORY_PRODUCT}
            element={<ListBaseCategory />}
          />
          <Route
            path={path.CREATE_CATEGORY_PRODUCT}
            element={<CreateCategory />}
          />
          <Route path={path.MANAGE_COLOR} element={<ListBaseColor />} />
          <Route path={path.CREATE_COLOR} element={<CreateColor />} />
          <Route path={path.MANAGE_ENQUIRY} element={<ListBaseEnquiry />} />
          <Route path={path.CREATE_CONFIG} element={<CreateConfig />} />
          <Route path={path.CREATE_MENU} element={<CreateMenu />} />
          <Route path={path.MANAGE_COUPON} element={<ListBaseCoupon />} />
          <Route path={path.CREATE_COUPON} element={<CreateCoupon />} />
          <Route path={path.PERSONAL_ADMIN} element={<PersonalAdmin />} />
          <Route path={path.MANAGE_SHIP} element={<ListBaseShip />} />
          <Route path={path.CREATE_SHIP} element={<CreateShip />} />
          <Route path={path.MANAGE_BRAND} element={<ListBaseBrand />} />
          <Route path={path.CREATE_BRAND} element={<CreateBrand />} />
          <Route path={path.MANAGE_RETAIL} element={<ListBaseRetail />} />
          <Route path={path.CREATE_RETAIL} element={<CreateRetail />} />
        </Route>
        <Route path={path.MEMBER} element={<MemberLayout />}>
          <Route path={path.PERSONAL} element={<Personal />} />
          <Route path={path.MY_CART} element={<MyCart />} />
          <Route path={path.HISTORY} element={<History />} />
          <Route path={path.WISHLIST} element={<Wishlist />} />
        </Route>
        <Route path={path.LOGIN} element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
