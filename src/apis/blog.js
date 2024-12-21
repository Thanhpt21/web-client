import axios from "../axios";

export const apigetBlogs = (params) =>
  axios({
    url: "/blog/",
    method: "get",
    params,
  });

export const apigetBlog = (bid) =>
  axios({
    url: "/blog/" + bid,
    method: "get",
  });

export const apigetAllBlogs = () =>
  axios({
    url: "/blog/getall",
    method: "get",
  });

export const apiCreateBlog = (data) =>
  axios({
    url: "/blog/",
    method: "post",
    data,
  });

export const apiUpdateBlog = (data, bid) =>
  axios({
    url: "/blog/" + bid,
    method: "put",
    data,
  });

export const apiDeleteBlog = (bid) =>
  axios({
    url: "/blog/" + bid,
    method: "delete",
  });

export const apiLikeBlog = (bid) =>
  axios({
    url: "/blog/like/" + bid,
    method: "put",
  });

export const apiDisLikeBlog = (bid) =>
  axios({
    url: "/blog/dislike/" + bid,
    method: "put",
  });
