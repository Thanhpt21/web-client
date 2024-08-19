import React, { memo, useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import icons from "../../utils/icons";
import { Link } from "react-router-dom";
import path from "../../utils/path";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "store/user/userSlice";
import withBase from "hocs/withBase";
import { showCart } from "store/app/appSlice";
import Navigation from "components/navigation/Navigation";
import BotHeader from "./BotHeader";
import { TopHeader } from "components";

const { FaPhoneAlt, MdEmail, GiShoppingBag, FaUserCircle } = icons;

const Header = ({ dispatch }) => {
  const { menus } = useSelector((state) => state?.app);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="flex flex-col ">
      <TopHeader />
      <BotHeader menuOpen={menuOpen} toggleMenu={toggleMenu} menus={menus} />
      {/* <Navigation menuOpen={menuOpen} /> */}
    </div>
  );
};

export default withBase(memo(Header));
