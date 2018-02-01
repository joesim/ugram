import * as constants from "../constants";
import axios from "axios";

export interface ProfileLoading {
	type: constants.PROFILE_IS_LOADING,
	isLoading: boolean
}

export interface ProfileError {
	type: constants.PROFILE_HAS_ERRORED,
	hasErrored: boolean,
	errorMessage: string
}

export interface ProfileSuccess {
	type: constants.PROFILE_FETCH_DATA_SUCCESS,
	user: object
}

export type ProfilePanelActions = ProfileLoading | ProfileError | ProfileSuccess;

function profileIsLoading(bool: boolean) {
    return {
        type: constants.PROFILE_IS_LOADING,
        isLoading: bool
    };
}

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
		dispatch(profileIsLoading(true));
		axios.get("http://api.ugram.net/users/" + id)
		.then((response) => {
			dispatch(profileFetchDataSuccess(response.data))
			dispatch(profileIsLoading(false));
		})
		.catch((error) => {
			dispatch(profileIsLoading(false));
			dispatch(profileHasErrored(true, "Sorry! There was an error fetching this profile."));
		});
	};
}


export function editProfile(id: string, user: Object) {
	return (dispatch) => {
		dispatch(profileIsLoading(true));
		const data = JSON.stringify(user);
		axios.put("http://api.ugram.net/users/" + id, data, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer c547bd6c-a81d-4aad-8bb3-403a71ecba68'
			}
		})
		.then((response) => {
			dispatch(profileFetchDataSuccess(response.data))
			dispatch(profileIsLoading(false));
		})
		.catch((error) => {
			dispatch(profileIsLoading(false));
			dispatch(profileHasErrored(true, "Sorry! There was an error editing this profile."));
		});
	};
}


