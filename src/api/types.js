import request from "@/utils/request";

export function getTypes(data) {
  return request({
    url: "/category/list",
    method: "get",
    data: null,
    params: data,
  });
}

export function addType(name, type) {
  return request({
    url: `/category/add/${type}/${name}`,
    method: "post",
    data: null,
  });
}

export function getCategoryByType(id) {
  return request({
    url: `/category/listByType?type=${id}`,
    method: "get",
    data: null,
  });
}
