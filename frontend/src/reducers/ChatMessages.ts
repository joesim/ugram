import { ADD_CHAT_MESSAGE, RECEIVE_CHAT_MESSAGES } from "../constants";

const initialState = {
	chatMessages: [
	],
};

export function chatMessages(state = initialState, action): object {
	switch (action.type) {
		case RECEIVE_CHAT_MESSAGES:
			state.chatMessages = action.messages.reverse();
            return { ...state };
		case ADD_CHAT_MESSAGE:
			state.chatMessages = Object.assign([], state.chatMessages);
			state.chatMessages.push(action.message);
			if (state.chatMessages.length > 5) {
				state.chatMessages.shift();
			}

            return { ...state };
		default:
			return state;
	}
}
