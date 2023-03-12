import axios from "axios";

const apiCalls = async (method, url, data) => {
  // axios.defaults.headers.common.Authorization = `Bearer ${localStorage.token}`
  try {
    const res = await axios({
      method: method,
      url: url,
      data: data,
    });

    return res;
  } catch (error) {
    throw error;
  }
};

export default apiCalls;
