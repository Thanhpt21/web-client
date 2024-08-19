import axios from "../axios";

export const apigetConfig = (cid) =>
  axios({
    url: "/config/" + cid,
    method: "get",
  });

export const apiUpdateConfig = (data, cid) =>
  axios({
    url: "/config/" + cid,
    method: "put",
    data,
  });
