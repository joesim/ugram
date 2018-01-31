import * as constants from "../constants";
import {FetchError} from "../types/index.js";
import axios from "axios";


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
		axios.get("http://api.ugram.net/users/team06")
		.then((response) => {
			dispatch(profileFetchDataSuccess(response.data))
			dispatch(profileIsLoading(false));
		})
		.catch((error) => dispatch(fetchError("Get user", error.response)));
	};
}


export function editProfile(user) {
	return (dispatch) => {
		dispatch(profileIsLoading(true));
		let data = JSON.stringify(user);
		console.log(user);
		axios.put("http://api.ugram.net/users/team06", data, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer c547bd6c-a81d-4aad-8bb3-403a71ecba68'
			}
		})
		.then((response) => {
			dispatch(profileFetchDataSuccess(response.data))
			dispatch(profileIsLoading(false));
		})
		.catch((error) => dispatch(fetchError("Edit user", error.response)));
	};
}


