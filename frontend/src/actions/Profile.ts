import * as constants from "../constants";
import axios from "axios";
import { fetchError } from "./Errors";

export interface ProfileError {
	type: constants.PROFILE_HAS_ERRORED,
	hasErrored: boolean,
	errorMessage: string
}

export interface ProfileSuccess {
	type: constants.PROFILE_FETCH_DATA_SUCCESS,
	user: object
}

export type ProfilePanelActions = ProfileError | ProfileSuccess;


function profileHasErrored(bool: boolean, customMessage:string) {
	return {
        type: constants.PROFILE_HAS_ERRORED,
		hasErrored: bool,
		errorMessage: customMessage
    };
}

function profileFetchDataSuccess(user: Object) {
	return {
		type: constants.PROFILE_FETCH_DATA_SUCCESS,
		user,
	};
}

export function profileFetchData(id: string) {
	return (dispatch) => {
		axios.get("http://api.ugram.net/users/" + id)
		.then((response) => {
			dispatch(profileFetchDataSuccess(response.data))
		})
		.catch((error) => {
			dispatch(fetchError("Sorry! There was an error fetching this profile.", error));
		});
	};
}


export function editProfile(id: string, user: Object) {
	return (dispatch) => {
		const data = JSON.stringify(user);
		axios.put("http://api.ugram.net/users/" + id, data, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + window.localStorage.getItem("token-06")
			}
		})
		.then((response) => {
			dispatch(profileFetchDataSuccess(response.data))
		})
		.catch((error) => {
			dispatch(fetchError("Sorry! There was an error editing this profile.", error));
		});
	};
}


