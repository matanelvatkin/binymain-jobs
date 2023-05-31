import axios from "axios";

export const setToken = async (token) => {
  // when you do logout pass the parameter as an empty string
  axios.defaults.headers.common.Authorization = token
    ? `Bearer ${token}`
    : null;
};
