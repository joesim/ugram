import * as constants from "../constants";
import axios from "axios";
import { throwError } from "./Errors";

export interface UpdatePicture {
	type: constants.UPDATE_PICTURE;
}

export interface DeletedPicture {
	type: constants.DELETE_PICTURE;
}


export type PictureDetailsAction = UpdatePicture;

function updatePicture() : UpdatePicture {
	return {
		type: "UPDATE_PICTURE",
	};
}

function deletedPicture() : DeletedPicture {
	return {
		type: "DELETE_PICTURE",
	};
}

// API

function fetchUpdatePicture(userId, pictureId, data, token) {
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	axios.defaults.headers.put['Content-Type'] = 'application/json';
	return axios.put(`http://api.ugram.net/users/${userId}/pictures/${pictureId}`, JSON.stringify(data));
}

function fetchDeletePicture(userId, pictureId, token) {
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	return axios.delete(`http://api.ugram.net/users/${userId}/pictures/${pictureId}`);
}

//

export function editPicture(userId, pictureId, data, token) {
	return function (dispatch) {
		return fetchUpdatePicture(userId, pictureId, data, token).then(
			() => dispatch(updatePicture()),
			error => dispatch(throwError("Update picture", error))
		);
	};
}

export function deletePicture(userId, pictureId, token) {
	return function (dispatch) {
		return fetchDeletePicture(userId, pictureId, token).then(
			() => dispatch(deletedPicture()),
			error => dispatch(throwError("Delete picture", error))
		);
	};
}