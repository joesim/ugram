import axios from "axios";

axios.defaults.baseURL = "http://api.ugram.net";

setDefaultsFromLocalStorage();

export function setDefaultsFromLocalStorage() {
    const token = window.localStorage.getItem("token-06");

    if (token !== null) {
        const bearerToken = "Bearer " + token;
        axios.defaults.headers.common.Authorization = bearerToken;
    }
}
export default axios;
