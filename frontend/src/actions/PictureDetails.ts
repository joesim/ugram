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
        type: constants.UPDATE_PICTURE,
    };
}

function deletedPicture(): DeletedPicture {
    return {
        type: constants.DELETE_PICTURE,
    };
}

export function editPicture(userId, pictureId, data) {
    return async (dispatch) => {
        try {
	        const response = axios.put(`/users/${userId}/pictures/${pictureId}`, JSON.stringify(data));
	        dispatch(updatePicture());
        } catch (error) {
            dispatch(throwError("Could not delete picture", error));
        }
    };
}

export function deletePicture(userId, pictureId) {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`/users/${userId}/pictures/${pictureId}`);
            dispatch(deletedPicture());
        } catch (error) {
            dispatch(throwError("Could not delete picture", error));
        }
    };
}
