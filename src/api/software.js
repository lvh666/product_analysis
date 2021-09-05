import request from "@/utils/request";

export function getLikeSoftwares() {
  return request({
    url: `/software/guessYouLike`,
    method: "get",
    data: null,
  });
}

export function getSoftware(data) {
  return request({
    url: "/software/listByCategory",
    method: "get",
    data: null,
    params: data,
  });
}

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

export function getReviewList(data) {
  return request({
    url: `/user/SoftwareList`,
    method: "get",
    data: null,
    params: data,
  });
}

export function reviewSoftware(id, status) {
  return request({
    url: `/user/checkSoftware/${id}`,
    method: "get",
    data: null,
    params: {
      status,
    },
  });
}

export function getSoftwareItem(id) {
  return request({
    url: `/software/detail/${id}`,
    method: "get",
    data: null,
  });
}

export function getSoftwaresByType(data) {
  return request({
    url: "/software/listByType",
    method: "get",
    data: null,
    params: data,
  });
}
