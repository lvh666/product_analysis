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
