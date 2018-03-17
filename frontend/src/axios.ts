import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";
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
