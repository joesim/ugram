import axios from "../axios";
import * as constants from "../constants";
import { User } from "../types/";
import { throwError } from "./Errors";

interface ReceiveUsers {
    type: constants.RECEIVE_USERS;
    users: User[];
}

function receiveAllUsers(users): ReceiveUsers {
    return {
        type: constants.RECEIVE_USERS,
        users,
    };
}

function receiveNewUsers() {
    return {
        type: constants.RECEIVE_NEW_USERS,
    };
}

export function getAllUsers(page, perPage) {
    return async (dispatch) => {
        try {
            const data = await axios.get(`/users/?page=${page}&perPage=${perPage}`);
            dispatch(receiveAllUsers(data.data));
        } catch (error) {
            dispatch(throwError("Could not get users", error));
        }
    };
}

export function getAllUsersFiltered(query, page, perPage) {
    return async (dispatch) => {
        try {

            axios.defaults.baseURL = "http://localhost:3000";
            const data = await axios.get(`/users`);
            axios.defaults.baseURL = "http://api.ugram.net";
            dispatch(receiveAllUsers(data.data));
        } catch (error) {
            dispatch(throwError("Could not get users", error));
        }
    };
}

export function receivingNewUsers(){
    return (dispatch) => {
        dispatch(receiveNewUsers());
    }
}
