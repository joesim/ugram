import axios from "axios";
import * as constants from "../constants";
import { throwError } from "./Errors";

export interface UpdatePicture {
    type: constants.UPDATE_PICTURE;
}

export interface DeletedPicture {
    type: constants.DELETE_PICTURE;
}

export interface UpdatedReaction {
    type: constants.UPDATE_REACTION;
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

function updatedReaction(): UpdatedReaction {
    return {
        type: constants.UPDATE_REACTION,
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

export function updateReaction(pictureUserId, pictureId) {
    return async (dispatch) => {
        try {
            const response = axios.post(`/users/${pictureUserId}/pictures/${pictureId}/reactions`);
            dispatch(updatedReaction());
        } catch (error) {
            dispatch(throwError("Could not update the like state", error));
        }
    };
}
