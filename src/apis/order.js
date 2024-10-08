import axios from "../axios";

export const apiCreateOrder = (data) =>
  axios({
    url: `/order/`,
    method: "post",
    data,
  });

export const apiGetOrders = (params) =>
  axios({
    url: `/order/admin`,
    method: "get",
    params,
  });

export const apiGetUserOrders = (params) =>
  axios({
    url: `/order/`,
    method: "get",
    params,
  });

export const apiGetOrdersByAdmin = (params) =>
  axios({
    url: `/order/allorder`,
    method: "get",
    params,
  });

export const apiUpdateStatus = (data, oid) =>
  axios({
    url: `/order/status/` + oid,
    method: "put",
    data,
  });
