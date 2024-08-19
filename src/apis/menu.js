import axios from "../axios";

export const apigetMenus = () =>
  axios({
    url: "/menu/",
    method: "get",
  });

export const apiCreateMenu = (data) =>
  axios({
    url: "/menu/",
    method: "post",
    data,
  });

export const apiUpdateMenu = (data, id) =>
  axios({
    url: "/menu/" + id,
    method: "put",
    data,
  });

export const apiDeleteMenu = (id) =>
  axios({
    url: "/menu/" + id,
    method: "delete",
  });
