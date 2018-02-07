import * as constants from "../constants";
import axios from "axios";
import { fetchError } from "./Errors";

interface ReceiveUsers {
	type: constants.RECEIVE_USERS;
	users: object;
}

function receiveAllUsers(users) : ReceiveUsers {
	return {
		type: constants.RECEIVE_USERS,
		users,
	};
}

function fetchAllUsers() : Promise<any> {
	return axios.get("http://api.ugram.net/users");
}

export function getAllUsers() {
	return function (dispatch) {
		return fetchAllUsers().then(
			users => dispatch(receiveAllUsers(users)),
			error => dispatch(fetchError("Get all users", error.json()))
		);
	};
}