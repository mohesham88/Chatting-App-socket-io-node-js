import axios from "axios";

import qs from "qs";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer(params) {
    return qs.stringify(params, { indices: false });
  },
})

