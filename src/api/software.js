import request from "@/utils/request";

export function getSoftwareTypes(data) {
  return request({
    url: "/category/list",
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
