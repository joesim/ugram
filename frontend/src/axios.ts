import axios from "axios";

axios.defaults.baseURL = "http://api.ugram.net";

if (process.env.LIVRABLE_2) {
  axios.defaults.baseURL = "localhost:3000";
  //   TODO notre api
}

axios.defaults.headers.put["Content-Type"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";

setDefaultsFromLocalStorage();

export function setDefaultsFromLocalStorage() {
  const token = window.localStorage.getItem("token-06");

  if (token !== null) {
    const bearerToken = "Bearer " + token;
    axios.defaults.headers.common.Authorization = bearerToken;
  }
}
export default axios;
