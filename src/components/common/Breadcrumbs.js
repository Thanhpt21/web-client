import React from "react";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { Link, useLocation } from "react-router-dom";
import icons from "../../utils/icons";
import { useSelector } from "react-redux";

const { IoIosArrowForward } = icons;

const Breadcrumbs = ({ category, title }) => {
  const { menus } = useSelector((state) => state?.app);
  const location = useLocation(); // Để lấy đường dẫn hiện tại

  // Hàm để lấy giá trị từ category
  const getValueFromPath = (category) => {
    if (category) {
      const result = menus?.find((item) => item.path === `/${category}`);
      return result ? result.value : category;
    }
    return null;
  };

  // Kiểm tra category trước khi tạo routes
  const routes = category
    ? [
        { path: "/", breadcrumb: "Trang chủ" },
        {
          path: "/:category",
          breadcrumb: getValueFromPath(category),
        },
        { path: "/:category/:pid", breadcrumb: title },
      ]
    : [];

  const breadcrumbs = useBreadcrumbs(routes);

  return (
    <div className="flex flex-wrap items-center gap-1 text-sm">
      {category &&
        breadcrumbs.length > 0 &&
        breadcrumbs.map(({ match, breadcrumb }, index, self) => {
          const isActive = location.pathname === match.pathname; // Kiểm tra breadcrumb hiện tại
          const isLast = index === self.length - 1;
          const isCategoryPid = match.pathname.includes("/:pid"); // Kiểm tra nếu là path cần xuống hàng

          return (
            <React.Fragment key={match.pathname}>
              <Link
                className={`flex items-center gap-1 ${
                  isActive ? "text-main" : "hover:text-main"
                } ${isCategoryPid ? "w-full" : ""}`}
                to={match.pathname}
              >
                <span>{breadcrumb}</span>
                {!isLast && !isActive && (
                  <IoIosArrowForward
                    className={`inline-block ${
                      isCategoryPid ? "md:hidden" : "hidden md:inline-block"
                    }`}
                  />
                )}
              </Link>
            </React.Fragment>
          );
        })}
    </div>
  );
};

export default Breadcrumbs;
