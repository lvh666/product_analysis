import request from "@/utils/request";

export function getSoftware(data) {
  return request({
    url: "/software/list",
    method: "get",
    data: null,
    params: data,
  });
}

export function addArticle(data) {
  return request({
    url: "/post/add",
    method: "post",
    data,
  });
}

export function changeArticle(data, id, score) {
  return request({
    url: `/post/change/${id}/${score}`,
    method: "put",
    data,
  });
}

export function delArticle(id) {
  return request({
    url: `/post/del/${id}`,
    method: "DELETE",
    data: null,
  });
}

export function getArticles(data) {
  return request({
    url: `/post/list/user`,
    method: "get",
    data: null,
    params: data,
  });
}
