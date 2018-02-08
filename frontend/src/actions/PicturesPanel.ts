import * as constants from "../constants";
import axios from "axios";

export interface GetPictures {
	type: constants.GET_PICTURES;
	pictures: object;
}

export interface FetchError {
	type: constants.FETCH_ERROR;
	customMessage: string;
	error: object;
}

export type PicturesPanelAction = GetPictures | FetchError;

function getPictures(pictures) : GetPictures {
	return {
		type: "GET_PICTURES",
		pictures,
	};
}

function fetchError(customMessage, error) : FetchError {
	return {
		type: "FETCH_ERROR",
		customMessage,
		error,
	};
}

// API

function fetchAllPictures(page, perPage) {
	return axios.get(`http://api.ugram.net/pictures?page=${page}&perPage=${perPage}`);
}

//

export function getAllPictures(page, perPage) {
	return function (dispatch) {
		return fetchAllPictures(page, perPage).then(
			pictures => dispatch(getPictures(pictures)),
			error => dispatch(fetchError("Get all pictures", error))
		);
	};
}