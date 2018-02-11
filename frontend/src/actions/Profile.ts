import axios from "axios";
import * as constants from "../constants";
import { throwError } from "./Errors";

export interface ProfileSuccess {
    type: constants.PROFILE_FETCH_DATA_SUCCESS,
    user: object
}

export type ProfilePanelActions = ProfileSuccess;

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
            dispatch(throwError("Sorry! There was an error fetching this profile.", error));
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
            dispatch(throwError("Sorry! There was an error editing this profile.", error));
        });
    };
}


