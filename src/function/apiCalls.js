import axios from "axios";

const apiCalls = async (
  method,
  url,
  information = null,
  param = null,
  header = null
) => {
  const baseUrl = "http://localhost:5556"
  // const baseUrl = "https://server-production-7ef9.up.railway.app/"
  const fullUrl = `${baseUrl}/api/${url}`;

  try {
    const data = await axios({
      method: method,
      url: fullUrl,
      data: information,
      params: { q: param },
      Headers: { header },
    });
    console.log(data.data);
    return data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default apiCalls;
