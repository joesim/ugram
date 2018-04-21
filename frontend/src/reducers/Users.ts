import { RECEIVE_NEW_USERS, RECEIVE_USERS } from "../constants";

const initialState = {
	users: [
	],
};

export function users(state = initialState, action): object {
	switch (action.type) {
		case RECEIVE_USERS:
			state.users = Object.assign([], state.users);
			action.users.items.forEach((element) => {
				state.users.push(element);
			});
			return { ...state };
		case RECEIVE_NEW_USERS:
			state.users = [];
			return state;
		default:
			return state;
	}
}
