import axios from "axios";
import { API_URL } from "./constants";

axios.defaults.baseURL = API_URL;
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
