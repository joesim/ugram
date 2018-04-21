import axios from "axios";
import * as constants from "../constants";
import { throwError } from "./Errors";

export interface SignupUser {
    type: constants.SIGNUP;
    tokenUrl: string;
}
export type SignupAction = SignupUser;

function redirectionToken(tokenUrl): SignupUser {
    return {
        tokenUrl,
        type: "SIGNUP",
    };
}

function fetchSignup(formData) {
    return axios.post(`/signup`, formData);
}

export function signupUser(formData) {
    return (dispatch) => {
        return fetchSignup(formData).then(
            (tokenUrl) => dispatch(redirectionToken(tokenUrl.request.responseURL)),
            (error) => dispatch(throwError("Signup", error)),
        );
    };
}

function fetchLogIn(formData) {
    return axios.post(`/logIn`, formData);
}

export function logIn(formData) {
    return (dispatch) => {
        return fetchLogIn(formData).then(
            (tokenUrl) => dispatch(redirectionToken(tokenUrl.request.responseURL)),
            (error) => dispatch(throwError("LogIn", error)),
        );
    };
}
