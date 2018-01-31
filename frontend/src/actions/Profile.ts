import * as constants from "../constants";
import {FetchError} from "../types/index.js";
import axios from "axios";

export interface EditProfile {
    type: constants.EDIT_PROFILE;
}

export interface GetUser {
    type: constants.GET_USER;
    user: object;
}

export type EditProfileAction = EditProfile | GetUser | FetchError;

export function editProfile(): EditProfile {
    return {
        type: constants.EDIT_PROFILE,
    };
}

export function fetchError(customMessage, error) : FetchError {
	return {
		type: "FETCH_ERROR",
		customMessage,
		error,
	};
}

export function profileIsLoading(bool) {
    return {
        type: 'PROFILE_IS_LOADING',
        isLoading: bool
    };
}

export function profileHasErrored(bool) {
	return {
        type: 'PROFILE_HAS_ERRORED',
        hasErrored: bool
    };
}

export function profileFetchDataSuccess(user) {
	return {
		type: "PROFILE_FETCH_DATA_SUCCESS",
		user,
	};
}

export function profileFetchData() {
	return (dispatch) => {
		dispatch(profileIsLoading(true));
		axios.get("http://api.ugram.net/users/itsgonnabesick")
		.then((response) => {
			dispatch(profileIsLoading(false));
			console.log(response.data);
			return response;
		})
		.then((response) => {
			console.log(response.data);
			dispatch(profileFetchDataSuccess(response.data))
		})
		.catch((error) => dispatch(fetchError("Get user", error.response)));
	};
}


