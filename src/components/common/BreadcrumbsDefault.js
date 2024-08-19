import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BreadcrumbsDefault = ({ path1, path2, path3 }) => {
  const { menus } = useSelector((state) => state?.app);

  // Hàm để thêm dấu gạch chéo vào trước path
  const getFullPath = (path) => {
    return `/${path}`;
  };

  // Hàm để tìm giá trị 'value' từ mảng dựa vào 'path'
  const getValueFromPath = (path) => {
    const result = menus?.find((item) => item.path === path);
    return result ? result.value : "Unknown";
  };

  return (
    <div className="py-4 flex md:flex-row flex-col justify-center items-center">
      <div className="w-full flex items-center gap-1 text-sm">
        <Link
          className="flex items-center hover:text-main gap-1"
          to={getFullPath(path1)}
        >
          <span>{getValueFromPath(getFullPath(path1))}</span>
          {path2 && <IoIosArrowForward />}
        </Link>
        {path2 && (
          <>
            <Link
              className={`flex items-center hover:text-main gap-1 ${
                !path3 ? "text-main" : ""
              }`}
              to={getFullPath(path2)}
            >
              <span>{getValueFromPath(getFullPath(path2))}</span>
              {path3 && <IoIosArrowForward />}
            </Link>
            {path3 && (
              <div className="flex items-center text-main gap-1">
                <span>{path3}</span>
              </div>
            )}
          </>
        )}
      </div>
      <div className="w-full">
        {!path2 && path3 && (
          <div className="flex items-center text-main gap-1">
            <span>{path3}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BreadcrumbsDefault;
