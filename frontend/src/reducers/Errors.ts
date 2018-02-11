import { THROW_ERROR } from "../constants";

const initialState = {
	error: null,
	errorMessage: null,
};

export function errors(state = initialState, action): object {
	switch (action.type) {
		case THROW_ERROR:
			state.error = action.error;
			state.errorMessage = action.customMessage;
			return { ...state };
		default:
			return state;
	}
}
