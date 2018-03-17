import axios from "axios";
import * as constants from "../constants";
import { throwError } from "./Errors";

export interface ProfileSuccess {
    type: constants.PROFILE_FETCH_DATA_SUCCESS;
    user: object;
}

export interface RemoveProfileSuccess {
	type: constants.REMOVE_PROFILE_SUCCESS;
	user: object;
}

export type ProfilePanelActions = ProfileSuccess | RemoveProfileSuccess;

function profileFetchDataSuccess(user: object) {
    return {
        type: constants.PROFILE_FETCH_DATA_SUCCESS,
        user,
    };
}

function removeProfileSuccess(user: object) {
	return {
		type: constants.REMOVE_PROFILE_SUCCESS,
		user,
	};
}

export function profileFetchData(id: string) {
    return (dispatch) => {
        axios.get("/users/" + id)
        .then((response) => {
            dispatch(profileFetchDataSuccess(response.data));
        })
        .catch((error) => {
            dispatch(throwError("Sorry! There was an error fetching this profile.", error));
        });
    };
}

export function editProfile(id: string, user: object) {
    return (dispatch) => {
        const data = JSON.stringify(user);
        axios.put("/users/" + id, data, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            dispatch(profileFetchDataSuccess(response.data));
        })
        .catch((error) => {
            dispatch(throwError("Sorry! There was an error editing this profile.", error));
        });
    };
}

export function removeProfile(id: string) {
	return (dispatch) => {
		axios.delete("/users/" + id)
			.then((response) => {
				dispatch(removeProfileSuccess(response));
			})
			.catch((error) => {
				dispatch(throwError("Sorry! There was an error removing this profile.", error));
			});
	};
}
