import apiCalls from "./apiCalls";

async function checkLink(url) {
  try {
    const response = await apiCalls("GET", "linkcheck", null, url);
    console.log(response);
    if (response === 200) {
      // Check if the status code is 200 (OK)
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Failed to check link:", error);
    return false;
  }
}
export default checkLink;
