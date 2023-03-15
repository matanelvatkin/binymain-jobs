import axios from "axios";
import dotenv from 'dotenv'

dotenv.config()
const apiCalls = async (
  method,
  url,
  information = null,
  param = null,
  header = null
) => {
  const fullUrl = `${process.env.SERVER}/api/${url}`;

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
