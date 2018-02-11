import * as constants from "../constants";

interface ThrowError {
    customMessage: string;
    error: object;
    type: constants.THROW_ERROR;
}

export function throwError(customMessage, error): ThrowError {
    return {
        customMessage,
        error,
        type: constants.THROW_ERROR,
    };
}
