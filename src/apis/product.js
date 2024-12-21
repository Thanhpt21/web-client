import axios from "../axios";

export const getProducts = (params) =>
  axios({
    url: "/product/",
    method: "get",
    params,
  });

export const apiGetAllProduct = () =>
  axios({
    url: "/product/getall",
    method: "get",
  });

export const getProduct = (pid) =>
  axios({
    url: "/product/" + pid,
    method: "get",
  });

export const apiRatings = (data) =>
  axios({
    url: "/product/ratings",
    method: "put",
    data,
  });

export const apiCreateProduct = (data) =>
  axios({
    url: "/product/",
    method: "post",
    data,
  });

export const apiUpdateProduct = (data, pid) =>
  axios({
    url: "/product/" + pid,
    method: "put",
    data,
  });

export const apiDeleteProduct = (pid) =>
  axios({
    url: "/product/" + pid,
    method: "delete",
  });

export const apiAddVariant = (data, pid) =>
  axios({
    url: "/product/variant/" + pid,
    method: "put",
    data,
  });

export const apiUpdateVariant = (data, pid, sku) =>
  axios({
    url: `/product/variant/${pid}/${sku}`,
    method: "put",
    data,
  });

export const apiDeleteProductVariant = (pid, sku) =>
  axios({
    url: `/product/variant/${pid}/${sku}`,
    method: "delete",
  });
