import React, { memo, useState } from "react";
import { useSelector } from "react-redux";
import withBase from "hocs/withBase";
import BotHeader from "./BotHeader";
import { TopHeader } from "components";

const Header = ({}) => {
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
