import React, { useEffect, useState } from "react";
import { apigetBlogs } from "apis";
import { BlogFrame, Pagination } from "components";
import withBase from "hocs/withBase";

import { useSelector } from "react-redux";

import { useForm } from "react-hook-form";
import path from "utils/path";
import BreadcrumbsDefault from "components/common/BreadcrumbsDefault";

const Blog = ({}) => {
  const { blogCategories } = useSelector((state) => state?.app);
  const [data, setdata] = useState(null);
  const [counts, setCounts] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");

  const {
    formState: { errors },
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
