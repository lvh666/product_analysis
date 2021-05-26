import axios from "axios";
import { Message } from "element-ui";
// import { getToken } from "@/utils/auth";

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api的base_url
  timeout: 40000, // request timeoutheaders: { 'Content-Type': 'application/x-www-form-urlencoded' },
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });
    Promise.reject(error);
  }
);

// respone interceptor
service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;
