import axios from "../axios";

export const apiRegister = (data) =>
  axios({
    url: "/user/register",
    method: "post",
    data,
  });

export const apiLogin = (data) =>
  axios({
    url: "/user/login",
    method: "post",
    data,
  });

export const getUserCurrent = () =>
  axios({
    url: "/user/current",
    method: "get",
  });

export const apiGetUsers = (params) =>
  axios({
    url: "/user/",
    method: "get",
    params,
  });

export const apiUpdateCurrent = (data) =>
  axios({
    url: "/user/current",
    method: "put",
    data,
  });

export const apiUpdateCart = (data) =>
  axios({
    url: "/user/cart",
    method: "put",
    data,
  });

export const apiRemoveCart = (pid, color) =>
  axios({
    url: `/user/remove-cart/${pid}/${color}`,
    method: "delete",
  });

export const apiUpdateWishlist = (pid) =>
  axios({
    url: `/user/wishlist/` + pid,
    method: "put",
  });

export const apiUpdateUserByAdmin = (data, uid) =>
  axios({
    url: `/user/` + uid,
    method: "put",
    data,
  });

export const apiDeleteUser = (uid) =>
  axios({
    url: "/user/" + uid,
    method: "delete",
  });
