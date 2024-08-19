import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { getProducts } from "../../apis";
import withBase from "../../hocs/withBase";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ navigate, dispatch, location }) => {
  const [product, setProduct] = useState(null);
  const [params] = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const fetchProducts = async (params) => {
    try {
      const response = await getProducts({
        ...params,
        limit: +process.env.REACT_APP_LIMIT,
      });

      if (response.success) {
        setProduct(response);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    fetchProducts(queries);
  }, [params]);

  const onSubmit = (data) => {
    setTimeout(() => {
      navigate({
        pathname: "/san-pham",
        search: createSearchParams({ q: data.q }).toString(),
      });
    }, 50);
    navigate({
      pathname: "/san-pham",
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full relative flex items-center"
    >
      {/* <input
        {...register("q")}
        type="text"
        placeholder="Tìm kiếm..."
        className="w-full px-3 py-2 rounded-lg bg-gray-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:bg-white italic font-normal"
      />
      <button
        type="submit"
        className="absolute inset-y-0 right-0 flex items-center pr-3 group"
      >
        <IoMdSearch className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-300 ease-in-out" />
      </button> */}

      <input
        {...register("q")}
        type="text"
        placeholder="Bạn cần tìm kiếm sản phẩm gì ?"
        className="py-2 px-4 pr-12 border-1 rounded-sm focus:outline-none focus:ring-0 w-full h-10"
      />
      <button
        type="submit"
        className="absolute right-0 top-0 h-full px-4 bg-gray-600 text-white rounded-sm flex items-center justify-center transition-colors duration-300 hover:bg-gray-800"
      >
        <FaSearch />
      </button>
    </form>
  );
};

export default withBase(SearchBar);
