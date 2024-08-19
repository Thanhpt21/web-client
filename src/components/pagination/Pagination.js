import React, { useEffect, useState } from "react";
import usePagination from "../../hooks/usePagination";
import PageItem from "./PageItem";
import { useSearchParams } from "react-router-dom";

const Pagination = ({ totalCount }) => {
  const [params] = useSearchParams();
  const pagination = usePagination(totalCount, +params.get("page") || 1);

  const range = (page) => {
    const currentPage = +params.get("page");
    const pageSize = +process.env.REACT_APP_LIMIT || 10;
    const start = Math.min((currentPage - 1) * pageSize + 1, totalCount);
    const end = Math.min(currentPage * pageSize, totalCount);

    return `${start}-${end}`;
  };
  return (
    <div className="grid grid-cols-1 my-2">
      <div className="flex justify-end">
        {/* {!+params.get("page") ? (
          <span className="text-sm italic">
            {`Hiển thị 
          ${Math.min(totalCount, 1)} -> 
          ${Math.min(+process.env.REACT_APP_LIMIT, totalCount)} 
          của ${totalCount}`}
          </span>
        ) : (
          ""
        )}
        {+params.get("page") ? (
          <span className="text-sm italic">{`Hiển thị ${range()} của ${totalCount}`}</span>
        ) : (
          ""
        )} */}
        <div className="flex items-center">
          {pagination?.map((el) => (
            <PageItem key={el}>{el}</PageItem>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pagination;
