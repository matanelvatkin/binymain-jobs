import axios from "axios";

const PORT = process.env.PORT ? process.env.PORT : 5556

const apiCalls = async (
    method,
    url,
    information = null,
    param = null,
    header = null
) => {
    const baseUrl = process.env.SERREACT_APP_SERVER || `http://localhost:${PORT}`
    // const baseUrl = "https://server-production-7ef9.up.railway.app/"
    const fullUrl = `${baseUrl}/api/${url}`;
    console.log(baseUrl);
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
