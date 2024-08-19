import React, { useEffect } from "react";
import clsx from "clsx";
import {
  useSearchParams,
  useNavigate,
  createSearchParams,
  useLocation,
} from "react-router-dom";

const PageItem = ({ children }) => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const location = useLocation();

  const handlePagination = () => {
    const queries = Object.fromEntries([...params]);
    if (Number(children)) queries.page = children;

    navigate({
      pathname: location.pathname,
      search: createSearchParams(queries).toString(),
    });
  };

  return (
    <button
      onClick={handlePagination}
      type="button"
      disabled={!Number(children)}
      className={clsx(
        "w-7 h-7 flex justify-center ",
        !Number(children) && "items-end pb-2",
        Number(children) && "items-center  hover:bg-gray-300",
        +params.get("page") === +children && " bg-gray-300",
        !+params.get("page") && +children === 1 && " bg-gray-300"
      )}
    >
      {children}
    </button>
  );
};

export default PageItem;
