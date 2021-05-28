import request from "@/utils/request";

export function getTypes(data) {
  return request({
    url: "/category/list",
    method: "get",
    data: null,
    params: data,
  });
}

export function addType(name) {
  return request({
    url: `/category/add/${name}`,
    method: "post",
    data: null,
  });
}
