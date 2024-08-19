import axios from "../axios";

export const getCategories = () =>
  axios({
    url: "/category/get",
    method: "get",
  });

export const getBlogCategories = () =>
  axios({
    url: "/blogcategory/get",
    method: "get",
  });
