import request from "@/utils/request";

export function getSoftwareTypes(data) {
  return request({
    url: "/category/list",
    method: "get",
    data: null,
    params: data,
  });
}

export function getSoftwares(data) {
  return request({
    url: `/user/mySoftwareList/${JSON.parse(localStorage.getItem("user"))?.id}`,
    method: "get",
    data: null,
    params: data,
  });
}

export function addSoftware(data) {
  return request({
    url: "/software/add",
    method: "post",
    data,
  });
}

export function changeSoftware(data, id) {
  return request({
    url: `/software/change/${id}`,
    method: "put",
    data,
  });
}

export function delSoftware(id) {
  return request({
    url: `/software/del/${id}`,
    method: "DELETE",
    data: null,
  });
}

export function getSoftwareDate(id) {
  return request({
    url: `/software/detail/${id}`,
    method: "get",
    data: null,
  });
}
