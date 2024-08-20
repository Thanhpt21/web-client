import axios from "../axios";

export const apigetConfig = () =>
  axios({
    url: "/config/",
    method: "get",
  });

export const apiUpdateConfig = (data, cid) =>
  axios({
    url: "/config/" + cid,
    method: "put",
    data,
  });
