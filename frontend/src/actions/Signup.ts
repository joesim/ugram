import * as constants from "../constants";
import axios from "axios";

export interface SignupUser {
	type: constants.SIGNUP;
	tokenUrl: string;
}

export interface FetchError {
	type: constants.FETCH_ERROR;
	customMessage: string;
	error: object;
}

export type SignupAction = SignupUser | FetchError;

function redirectionToken(tokenUrl) : SignupUser {
	return {
		type: "SIGNUP",
		tokenUrl
	};
}

function fetchError(customMessage, error) : FetchError {
	return {
		type: "FETCH_ERROR",
		customMessage,
		error,
	};
}

// API

function fetchSignup(formData) {
	return axios.post(`http://api.ugram.net/signup`, formData);
}

//

export function signupUser(formData) {
	return function (dispatch) {
		return fetchSignup(formData).then(
			tokenUrl => dispatch(redirectionToken(tokenUrl.request.responseURL)),
			error => dispatch(fetchError("Signup", error))
		);
	};
}