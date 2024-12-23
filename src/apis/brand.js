import axios from "../axios";

export const apigetBrands = (params) =>
  axios({
    url: "/brand/",
    method: "get",
    params,
  });

export const apigetAllBrands = (params) =>
  axios({
    url: "/brand/get",
    method: "get",
    params,
  });

export const apiCreateBrand = (data) =>
  axios({
    url: "/brand/",
    method: "post",
    data,
  });

export const apiUpdateBrand = (data, bid) =>
  axios({
    url: "/brand/" + bid,
    method: "put",
    data,
  });

export const apiDeleteBrand = (bid) =>
  axios({
    url: "/brand/" + bid,
    method: "delete",
  });
