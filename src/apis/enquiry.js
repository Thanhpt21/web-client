import axios from "../axios";

export const apigetEnquirys = (params) =>
  axios({
    url: "/enquiry/",
    method: "get",
    params,
  });

export const apiCreateEnquiry = (data) =>
  axios({
    url: "/enquiry/",
    method: "post",
    data,
  });

export const apiUpdateEnquiry = (data, eid) =>
  axios({
    url: "/enquiry/" + eid,
    method: "put",
    data,
  });

export const apiDeleteEnquiry = (eid) =>
  axios({
    url: "/enquiry/" + eid,
    method: "delete",
  });
