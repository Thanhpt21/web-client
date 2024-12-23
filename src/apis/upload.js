import axios from "../axios";

export const apiUploadImage = (data) =>
  axios({
    url: "/upload/image",
    method: "post",
    data,
  });

export const apiUploadImages = (data) =>
  axios({
    url: "/upload/images",
    method: "post",
    data,
  });
