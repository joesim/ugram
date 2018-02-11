import * as constants from "../constants";

interface ThrowError {
	type: constants.THROW_ERROR;
	customMessage: string;
	error: object;
}

export function throwError(customMessage, error) : ThrowError {
	return {
		type: constants.THROW_ERROR,
		customMessage,
		error,
	};
}