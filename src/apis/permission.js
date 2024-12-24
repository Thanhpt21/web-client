import axios from "../axios";

// Lấy danh sách tất cả quyền (permissions) với các tham số tùy chọn
export const apigetPermissions = (params) =>
  axios({
    url: "/permission/", // Chuyển từ /ship/ thành /permission/
    method: "get",
    params,
  });

export const apigetallPermissions = () =>
  axios({
    url: "/permission/get",
    method: "get",
  });

// Lấy tất cả quyền (permissions)
export const apigetAllPermissions = () =>
  axios({
    url: "/permission/getall", // Chuyển từ /ship/getall thành /permission/getall
    method: "get",
  });

// Tạo quyền mới (permission)
export const apiCreatePermission = (data) =>
  axios({
    url: "/permission/", // Chuyển từ /ship/ thành /permission/
    method: "post",
    data,
  });

// Cập nhật quyền (permission) theo id
export const apiUpdatePermission = (data, pid) =>
  axios({
    url: "/permission/" + pid, // Chuyển từ /ship/ + sid thành /permission/ + pid
    method: "put",
    data,
  });

// Xóa quyền (permission) theo id
export const apiDeletePermission = (pid) =>
  axios({
    url: "/permission/" + pid, // Chuyển từ /ship/ + sid thành /permission/ + pid
    method: "delete",
  });
