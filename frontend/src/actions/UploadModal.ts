import axios from "axios";
import * as constants from "../constants";
import { throwError } from "./Errors";

export interface UploadPicture {
    type: constants.UPLOAD_PICTURE;
}

export type UploadModalAction = UploadPicture;

function uploadPicture(): UploadPicture {
    return {
        type: "UPLOAD_PICTURE",
    };
}

function setUpApi() {
    const token = window.localStorage.getItem("token-06");
    const bearerToken = `Bearer ${token}`;
    axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
}

function postPicture(userId, data, token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
    return axios.post(`http://api.ugram.net/users/${userId}/pictures/`, data);
}

export function upload(pictureModel, file) {
    const data = new FormData();
    const userId = window.localStorage.getItem("userId-06");
    const token = window.localStorage.getItem("token-06");
    data.append("userId", userId);
    data.append("file", file);

    return (dispatch) => {
        return postPicture(userId, data, token).then(
            () => console.log("succes"),
            (error) => console.log("erreur"),
        );
    };
}
