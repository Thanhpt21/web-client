import axios from "../axios";

export const apigetShips = (params) =>
  axios({
    url: "/ship/",
    method: "get",
    params,
  });

export const apigetAllShips = () =>
  axios({
    url: "/ship/getall",
    method: "get",
  });

export const apiCreateShip = (data) =>
  axios({
    url: "/ship/",
    method: "post",
    data,
  });

export const apiUpdateShip = (data, sid) =>
  axios({
    url: "/ship/" + sid,
    method: "put",
    data,
  });

export const apiDeleteShip = (sid) =>
  axios({
    url: "/ship/" + sid,
    method: "delete",
  });
