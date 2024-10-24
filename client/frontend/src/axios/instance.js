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
});

axiosInstance.interceptors.response.use(
  (response) => {
    //success status
    if (response.status === 200 || response.status === 201) {
      return response;
    }
    //error status
    else {
      const messages = response.data.messages;
      if (messages) {
        if (messages instanceof Array) {
          return Promise.reject({ messages });
        }
        return Promise.reject({ messages: [messages] });
      }
      return Promise.reject({ messages: ["Error, Try again later"] });
    }
  },
  (error) => {
    //unauthorised error

    if (error.response && error.response.status === 401) {
      // localStorage.removeItem("token");
      // redirect to the Login page if not authorized
      window.location.assign("/auth");
    }
    //internal server error
    else if (error.response && error.response.status === 500) {
      return Promise.reject(error.response);
    }
    //any other error
    else return Promise.reject(error);
  }
);
