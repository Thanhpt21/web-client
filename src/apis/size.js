import axios from "../axios";

export const apigetSizes = (params) =>
  axios({
    url: "/size/",
    method: "get",
    params,
  });

export const apigetAllSizes = () =>
  axios({
    url: "/size/getall",
    method: "get",
  });

export const apiCreateSize = (data) =>
  axios({
    url: "/size/",
    method: "post",
    data,
  });

export const apiUpdateSize = (data, sid) =>
  axios({
    url: "/size/" + sid,
    method: "put",
    data,
  });

export const apiDeleteSize = (sid) =>
  axios({
    url: "/size/" + sid,
    method: "delete",
  });
