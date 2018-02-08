import { RECEIVE_USERS, FETCH_ERROR } from "../constants"

const initialState = {
	users: [
	],
	error: null
};

export function users(state = initialState, action): object {
	switch (action.type) {
		case RECEIVE_USERS:
			state.users = action.users.data.items;
			return { ...state };
		case FETCH_ERROR:
			state.error = action.error;
			return { ...state };
		default:
			return state;
	}
}