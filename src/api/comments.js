import request from "@/utils/request";

export function getComments(data) {
  return request({
    url: "/comment/listByPost",
    method: "get",
    data: null,
    params: data,
  });
}

export function postComment(data) {
  return request({
    url: "/comment/add",
    method: "post",
    data: data,
  });
}

export function getReply(data) {
  return request({
    url: "/reply/list",
    method: "get",
    data: null,
    params: data,
  });
}

export function replyComment(data) {
  return request({
    url: "/reply/add",
    method: "post",
    data: data,
  });
}
