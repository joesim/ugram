import axios from "axios";
import * as constants from "../constants";
import { throwError } from "./Errors";

export interface UpdatePicture {
    type: constants.UPDATE_PICTURE;
}

export interface DeletedPicture {
    type: constants.DELETE_PICTURE;
}

export type PictureDetailsAction = UpdatePicture;

function updatePicture(): UpdatePicture {
    return {
        type: "UPDATE_PICTURE",
    };
}

function deletedPicture(): DeletedPicture {
    return {
        type: "DELETE_PICTURE",
    };
}

function fetchUpdatePicture(userId, pictureId, data) {
    return axios.put(`/users/${userId}/pictures/${pictureId}`, JSON.stringify(data));
}

function fetchDeletePicture(userId, pictureId) {
    return axios.delete(`/users/${userId}/pictures/${pictureId}`);
}

export function editPicture(userId, pictureId, data) {
    return function (dispatch) {
        return fetchUpdatePicture(userId, pictureId, data).then(
            () => dispatch(updatePicture()),
            error => dispatch(throwError("Update picture", error))
        );
    };
}

export function deletePicture(userId, pictureId) {
    return function (dispatch) {
        return fetchDeletePicture(userId, pictureId).then(
            () => dispatch(deletedPicture()),
            error => dispatch(throwError("Delete picture", error))
        );
    };
}