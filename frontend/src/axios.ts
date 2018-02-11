import axios from "axios";

const bob = 3;

axios.defaults.baseURL = "http://api.ugram.net";

const token = window.localStorage.getItem("token-06");
const bearerToken = "Bearer " + token;
axios.defaults.headers.common.Authorization = bearerToken;

export default axios;
