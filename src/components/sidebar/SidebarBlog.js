import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const SidebarBlog = () => {
  const { blogCategories } = useSelector((state) => state?.app);

  return (
    <div className="flex flex-col border">
      {blogCategories?.map((el) => (
        <NavLink
          key={el.title}
          to={el.title}
          className={({ isActive }) =>
            isActive
              ? "bg-main text-white px-5 py-2 text-sm hover:text-main"
              : "px-5 py-2 text-sm hover:text-main"
          }
        >
          {el.title}
        </NavLink>
      ))}
    </div>
  );
};

export default SidebarBlog;
