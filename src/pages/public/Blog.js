import React, { useCallback, useEffect, useState } from "react";
import { apigetAllBlogs, apigetBlogs } from "apis";
import { BlogFrame, Breadcrumbs, Pagination } from "components";
import withBase from "hocs/withBase";

import {
  createSearchParams,
  Link,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "store/blog/blogActions";
import useDebounce from "hooks/useDebounce";
import { useForm } from "react-hook-form";
import { convertToSlug } from "utils/helpers";
import path from "utils/path";
import { IoIosArrowForward } from "react-icons/io";
import BreadcrumbsDefault from "components/common/BreadcrumbsDefault";

const Blog = ({ navigate, location, dispatch }) => {
  const { blogCategories } = useSelector((state) => state?.app);
  const [params] = useSearchParams();
  const [data, setdata] = useState(null);
  const [counts, setCounts] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");

  let { category } = useParams();

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm();

  const handleOnChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const blogcateId = blogCategories?.find(
    (item) => item.title === selectedCategory
  )?._id;

  const fetchBlog = async () => {
    if (!blogCategories) {
      console.error("Categories are not available");
      return;
    }

    const response = await apigetBlogs({
      category: blogcateId,
      limit: +process.env.REACT_APP_LIMIT,
    });
    if (response.success) {
      setdata(response.blogs);
      setCounts(response.counts);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [blogcateId]);

  return (
    <div className="w-full">
      <BreadcrumbsDefault path1={path.HOME} path2={path.BLOG} />
      <div className="grid grid-cols-1 py-4">
        <div className="flex flex-col gap-2">
          <span className="font-semibold tetxt-sm">Sắp xếp theo</span>
          <div className="w-full">
            <select
              value={selectedCategory}
              onChange={(e) => handleOnChange(e)}
              className="form-select text-sm"
            >
              <option value="">Tất cả</option>
              {blogCategories?.map((el) => (
                <option key={el._id} value={el.title}>
                  {el.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
        {data?.map((el) => (
          <BlogFrame key={el?._id} data={el} bid={el._id} />
        ))}
      </div>

      {selectedCategory === "" && (
        <div>
          <Pagination totalCount={counts} />
        </div>
      )}
    </div>
  );
};

export default withBase(Blog);
