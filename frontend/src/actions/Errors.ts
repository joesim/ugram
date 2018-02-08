import * as constants from "../constants";

interface FetchError {
	type: constants.FETCH_ERROR;
	customMessage: string;
	error: object;
}

export function fetchError(customMessage, error) : FetchError {
	return {
		type: constants.FETCH_ERROR,
		customMessage,
		error,
	};
}