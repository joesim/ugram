import axios from "axios";
import * as constants from "../constants";
import { throwError } from "./Errors";
import { sendNotification } from "./Notifications";

export interface UploadPicture {
    type: constants.UPLOAD_PICTURE;
}

export type UploadModalAction = UploadPicture;

function uploadedPicture(): UploadPicture {
    return {
        type: "UPLOAD_PICTURE",
    };
}

function postPicture(userId, data, token) {
    axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
    return axios.post(`/users/${userId}/pictures/`, data);
}

export function uploadPicture(pictureModel, file) {
    const data = new FormData();
    const userId = window.localStorage.getItem("userId-06");
    const token = window.localStorage.getItem("token-06");

    data.append("file", file);
    data.append("pictureModel", "description");
    data.append("pictureModel", "mentions");
    data.append("pictureModel", "tags");
    data.append("description", pictureModel.description);

    pictureModel.mentions.forEach((mention) => {
        data.append("mentions", mention);
    });

    pictureModel.tags.forEach((tag) => {
        data.append("tags", tag);
    });

    data.append("pictureModel", pictureModel);
    return (dispatch) => {
        return postPicture(userId, data, token).then(
            () => {
                dispatch(uploadedPicture());
                dispatch(sendNotification("Picture successfully uploaded!"));
            },
            (error) => dispatch(throwError("Upload picture", error)),
        );
    };
}
