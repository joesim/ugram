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

export function getAllUsers() {
    return async (dispatch) => {
        try {
            const nbUsers = await axios.get("/users");
            const data = await axios.get(`/users/?perPage=${nbUsers.data.totalEntries}`);
            dispatch(receiveAllUsers(data.data));
        } catch (error) {
            dispatch(throwError("Could not get users", error));
        }
    };
}
