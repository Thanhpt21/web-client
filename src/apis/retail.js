import axios from "../axios";

export const apigetRetails = (params) =>
  axios({
    url: "/retail/",
    method: "get",
    params,
  });

export const apigetAllRetails = () =>
  axios({
    url: "/retail/getall",
    method: "get",
  });

export const apiCreateRetail = (data) =>
  axios({
    url: "/retail/",
    method: "post",
    data,
  });

export const apiUpdateRetail = (data, rid) =>
  axios({
    url: "/retail/" + rid,
    method: "put",
    data,
  });

export const apiDeleteRetail = (rid) =>
  axios({
    url: "/retail/" + rid,
    method: "delete",
  });
