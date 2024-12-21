import axios from "../axios";

export const apigetCoupons = (params) =>
  axios({
    url: "/coupon/",
    method: "get",
    params,
  });

export const apigetAllCoupon = () =>
  axios({
    url: "/coupon/getall",
    method: "get",
  });

export const apiCreateCoupon = (data) =>
  axios({
    url: "/coupon/",
    method: "post",
    data,
  });

export const apiUseCoupon = (cid) =>
  axios({
    url: "/coupon/use-coupon/" + cid,
    method: "post",
  });

export const apiUpdateUsedCount = (cid) =>
  axios({
    url: "/coupon/update-used-count/" + cid,
    method: "post",
  });

export const apiUpdateCoupon = (data, cid) =>
  axios({
    url: "/coupon/" + cid,
    method: "put",
    data,
  });

export const apiDeleteCoupon = (cid) =>
  axios({
    url: "/coupon/" + cid,
    method: "delete",
  });
