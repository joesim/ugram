import { RECEIVE_USERS } from "../constants";

const initialState = {
	users: [
	],
};

export function users(state = initialState, action): object {
	switch (action.type) {
		case RECEIVE_USERS:
			state.users = action.users.items;
			return { ...state };
		default:
			return state;
	}
}
