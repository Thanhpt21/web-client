import axios from "../axios";

export const apigetColors = (params) =>
  axios({
    url: "/color/",
    method: "get",
    params,
  });

export const apigetAllColors = () =>
  axios({
    url: "/color/getall",
    method: "get",
  });

export const apiCreateColor = (data) =>
  axios({
    url: "/color/",
    method: "post",
    data,
  });

export const apiUpdateColor = (data, cid) =>
  axios({
    url: "/color/" + cid,
    method: "put",
    data,
  });

export const apiDeleteColor = (cid) =>
  axios({
    url: "/color/" + cid,
    method: "delete",
  });
