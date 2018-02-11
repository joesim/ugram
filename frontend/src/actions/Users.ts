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

export async function getAllUsers() {
    return async (dispatch) => {
        try {
            const response = await axios.get("/users");
            dispatch(receiveAllUsers(response.data));
        } catch (error) {
            dispatch(throwError("Could not get users", error));
        }
    };
}
