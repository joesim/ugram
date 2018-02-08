import { SignupAction } from "../actions";
import { SIGNUP, FETCH_ERROR } from "../constants"

const initialState = {
	tokenUrl: "",
};

export function signup(state = initialState, action): object {
	switch (action.type) {
		case SIGNUP:
			state.tokenUrl = action.tokenUrl;
			return { ...state };
		case FETCH_ERROR:
			return { ...state };
		default:
			return state;
	}
}