import { apigetBlogs } from "apis";
import React, { useEffect, useState } from "react";
import BlogFrame from "./BlogFrame";

const Blogs = () => {
  const [data, setdata] = useState(null);
  const fetchBlog = async () => {
    const response = await apigetBlogs({ limit: 3 });
    if (response.success) {
      setdata(response.blogs);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);
  return (
    <div className="my-8" data-aos="fade-in">
      <h3 className="text-[20px] font-semibold mb-6 py-[15px] border-b-2 border-main">
        TIN TỨC
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 gap-y-8 sm:gap-4 md:gap-6">
        {data?.map((el) => (
          <BlogFrame key={el?._id} data={el} bid={el._id} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
