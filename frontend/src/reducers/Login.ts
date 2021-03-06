import { LOGIN } from "../constants";

const initialState = {
	tokenUrl: "",
};

export function login(state = initialState, action): object {
	switch (action.type) {
		case LOGIN:
			state.tokenUrl = action.tokenUrl;
			return { ...state };
		default:
			return state;
	}
}
