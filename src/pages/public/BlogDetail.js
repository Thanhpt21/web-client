import { apigetBlog, apigetBlogs, apiLikeBlog, apiDisLikeBlog } from "apis";
import { SummaryPanel } from "components";
import BreadcrumbsDefault from "components/common/BreadcrumbsDefault";
import withBase from "hocs/withBase";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { FaRegEye, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import {} from "react-icons/fa";
import { createSearchParams, Link, useParams } from "react-router-dom";

import { truncateText } from "utils/helpers";
import path from "utils/path";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const BlogDetail = ({ navigate, location }) => {
  const { current } = useSelector((state) => state.user);
  const params = useParams();
  const [data, setdata] = useState(null);
  const [databycat, setdatabycat] = useState(null);
  const [databynew, setdatabynew] = useState(null);
  const [databyview, setdatabyview] = useState(null);
  const [cat, setCat] = useState(null);
  const [bid, setbid] = useState(null);
  const [likes, setLikes] = useState(0); // Trạng thái cho số lượng likes
  const [dislikes, setDislikes] = useState(0); // Trạng thái cho số lượng dislikes
  const [isLiked, setIsLiked] = useState(false); // Trạng thái cho việc đã like hay chưa
  const [isDisliked, setIsDisliked] = useState(false); // Trạng thái cho việc đã dislike hay chưa

  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded(!isExpanded);

  // Cắt dữ liệu nếu chưa mở rộng
  const displayedContent = isExpanded
    ? data?.content
    : data?.content.slice(0, 1); // Chỉ lấy 3 mục đầu tiên, bạn có thể điều chỉnh số lượng này

  const handleLike = async () => {
    if (!current?._id) {
      Swal.fire({
        title: "Đăng nhập",
        text: "Bạn cần đăng nhập để like bài viết",
        icon: "warning",
        confirmButtonText: "Đăng nhập",
        cancelButtonText: "Hủy",
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate({
            pathname: `/${path.LOGIN}`,
            search: createSearchParams({
              redirect: location.pathname,
            }).toString(),
          });
        }
      });
      return;
    }

    try {
      const response = await apiLikeBlog(bid || params.bid);
      if (response.success) {
        setLikes(response.likes.length);
        setDislikes(response.dislikes.length);
        setIsLiked(!isLiked);
        if (isDisliked) setIsDisliked(false); // Bỏ dislike nếu đã dislike
      }
    } catch (error) {
      console.error("Không thể like bài viết:", error);
    } finally {
      fetchBlogDetail();
    }
  };

  // Hàm xử lý dislike
  const handleDislike = async () => {
    if (!current?._id) {
      Swal.fire({
        title: "Đăng nhập",
        text: "Bạn cần đăng nhập để dislike bài viết",
        icon: "warning",
        confirmButtonText: "Đăng nhập",
        cancelButtonText: "Hủy",
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate({
            pathname: `/${path.LOGIN}`,
            search: createSearchParams({
              redirect: location.pathname,
            }).toString(),
          });
        }
      });
      return;
    }

    try {
      const response = await apiDisLikeBlog(bid);
      if (response.success) {
        setLikes(response.likes.length);
        setDislikes(response.dislikes.length);
        setIsDisliked(!isDisliked);
        if (isLiked) setIsLiked(false); // Bỏ like nếu đã like
      }
    } catch (error) {
      console.error("Không thể dislike bài viết:", error);
    } finally {
      fetchBlogDetail();
    }
  };
  const fetchBlogDetail = async () => {
    const response = await apigetBlog(params.bid);
    if (response.success) {
      if (response.success) {
        setdata(response.blogs);
        setbid(params.bid);
        setCat(response.blogs?.category);
        setLikes(response.blogs?.likes.length || 0);
        setDislikes(response.blogs?.dislikes.length || 0);
        setIsLiked(response.blogs?.likes.includes(current?._id)); // Kiểm tra nếu user đã like
        setIsDisliked(response.blogs?.dislikes.includes(current?._id)); // Kiểm tra nếu user đã dislike
      }
    }
  };

  useEffect(() => {
    fetchBlogDetail();
  }, [params.bid]);

  const fetchBlog = async () => {
    setCat(data?.category);

    if (cat !== null) {
      const response = await apigetBlogs({ category: cat });
      if (response.success) {
        setdatabycat(response.blogs);
      }
    }
  };

  const fetchBlogNew = async () => {
    const response = await apigetBlogs({ sort: "-createdAt", limit: 4 });
    if (response.success) {
      setdatabynew(response.blogs);
    }
  };

  const fetchBlogView = async () => {
    const response = await apigetBlogs({ sort: "--numberViews", limit: 4 });
    if (response.success) {
      setdatabyview(response.blogs);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (params && params.bid) {
        setbid(params.bid);
        await Promise.all([fetchBlogDetail(), fetchBlogNew(), fetchBlogView()]);
      }
    };

    fetchData();
  }, [params]);

  // useEffect to fetch blogs by category when cat changes
  useEffect(() => {
    if (cat !== null) {
      fetchBlog();
    }
  }, [cat]);

  return (
    <div className="w-full pb-4">
      <BreadcrumbsDefault
        path1={path.HOME}
        path2={path.BLOG}
        path3={data?.title}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        <div className="md:col-span-3 bg-white flex flex-col gap-4 p-3">
          <div className="">
            <h3 className="text-gray-900 font-medium text-[20px]">
              {data?.title}
            </h3>
          </div>

          <span className="flex gap-4 items-center">
            <span className="flex gap-1 items-center text-xs">
              <CiCalendarDate />
              <span>{moment(data?.createdAt).format("DD/MM/YYYY")}</span>
            </span>
            <span className="flex gap-1 items-center text-xs">
              Lượt xem: {data?.numberViews}
            </span>

            <span className="flex gap-1 items-center text-xs">
              Tác giả: {data?.author}
            </span>
          </span>
          <div className="flex gap-4">
            <span
              className={`flex items-center cursor-pointer ${
                isLiked ? "text-blue-600" : "text-gray-600"
              }`}
              onClick={handleLike}
            >
              <FaThumbsUp className="hover:text-blue-600" />
              <span className="ml-1">{likes}</span>
            </span>
            <span
              className={`flex items-center cursor-pointer ${
                isDisliked ? "text-red-600" : "text-gray-600"
              }`}
              onClick={handleDislike}
            >
              <FaThumbsDown className="hover:text-red-600" />
              <span className="ml-1">{dislikes}</span>
            </span>
          </div>
          <div
            className="border border-gray-200 border-l-red-700 border-l-8 p-2"
            dangerouslySetInnerHTML={{ __html: data?.description }}
          ></div>
          <div className="relative">
            <SummaryPanel content={displayedContent} />

            {/* Nút "Xem thêm" */}
            <div className="flex justify-center">
              <button
                onClick={toggleExpand}
                className="relative  z-20 flex items-center justify-center p-2 mt-4 bg-white border border-gray-300 rounded-md shadow-md text-gray-600 hover:text-gray-800 transition-colors"
              >
                <span className="mr-2">
                  {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
                </span>
                <span>{isExpanded ? "Thu gọn" : "Xem thêm"}</span>
              </button>
            </div>

            {/* Lớp phủ mờ */}
            {!isExpanded && (
              <div className="absolute inset-x-0 bottom-14 bg-white bg-opacity-70 h-16 z-10 pointer-events-none translate-y-4"></div>
            )}
          </div>
        </div>
        <div className="md:col-span-1 p-2  bg-white">
          {/* <h3 className="text-main font-medium text-[20px]">
            Tin tức liên quan
          </h3>
          <div className="flex flex-col gap-2 border px-2 py-1">
            {databycat
              ?.filter((i) => i._id !== data?._id)
              .map((el) => (
                <Link
                  to={`/tin-tuc/${el?._id}`}
                  className="h-fit border-red-600 border-b-2 hover:text-red-500 flex  gap-2"
                >
                  <img
                    className="w-[100px] h-[75px] object-cover"
                    src={el.images}
                    alt={el.title}
                  />
                  <div className="flex flex-col gap-2 text-sm line-clamp-2">
                    <span>{truncateText(el.title, 6)}</span>

                    <span className="flex gap-1 items-center text-xs text-gray-500">
                      <CiCalendarDate />
                      <span>{moment(el.createdAt).format("DD/MM/YYYY")}</span>
                    </span>
                  </div>
                </Link>
              ))}
          </div> */}

          <h3 className="text-main font-medium text-[20px] mt-4">
            Tin tức mới nhất
          </h3>
          <div className="flex flex-col gap-2 border px-2 py-1">
            {databynew
              ?.filter((i) => i._id !== data?._id)
              ?.map((el) => (
                <Link
                  to={`/tin-tuc/${el?._id}`}
                  className="h-fit border-red-600 border-b-2 hover:text-red-500 flex  gap-2"
                >
                  <img
                    className="w-[100px] h-[75px] object-cover"
                    src={el.images}
                    alt={el.title}
                  />
                  <div className="flex flex-col gap-2 text-sm line-clamp-2">
                    <span>{truncateText(el.title, 6)}</span>

                    <span className="flex gap-1 items-center text-xs text-gray-500">
                      <CiCalendarDate />
                      <span>{moment(el.createdAt).format("DD/MM/YYYY")}</span>
                    </span>
                  </div>
                </Link>
              ))}
          </div>

          <h3 className="text-main font-medium text-[20px] mt-4">
            Tin tức xem nhiều
          </h3>
          <div className="flex flex-col gap-2 border px-2 py-1">
            {databyview
              ?.filter((i) => i._id !== data?._id)
              ?.map((el) => (
                <Link
                  to={`/tin-tuc/${el?._id}`}
                  className="h-fit border-red-600 border-b-2 hover:text-red-500 flex  gap-2"
                >
                  <img
                    className="w-[100px] h-[75px] object-cover"
                    src={el.images}
                    alt={el.title}
                  />
                  <div className="flex flex-col gap-2 text-sm line-clamp-2">
                    <span>{truncateText(el.title, 6)}</span>

                    <span className="flex gap-1 items-center text-xs text-gray-500">
                      <FaRegEye />
                      <span>{el?.numberViews}</span>
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withBase(BlogDetail);
