import axios from "../axios";

export const apigetBlogCategories = (params) =>
  axios({
    url: "/blogcategory/",
    method: "get",
    params,
  });

export const apiCreateBlogCategory = (data) =>
  axios({
    url: "/blogcategory/",
    method: "post",
    data,
  });

export const apiUpdateBlogCategory = (data, bcid) =>
  axios({
    url: "/blogcategory/" + bcid,
    method: "put",
    data,
  });

export const apiDeleteBlogCategory = (bcid) =>
  axios({
    url: "/blogcategory/" + bcid,
    method: "delete",
  });
