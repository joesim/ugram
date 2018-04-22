import axios from "../axios";
import * as constants from "../constants";
import { throwError } from "./Errors";

interface ReceiveMessages {
    type: constants.RECEIVE_CHAT_MESSAGES;
    messages: object;
}

interface AddMessage {
    type: constants.ADD_CHAT_MESSAGE;
    message: object;
}

function receiveAllChatMessages(messages): ReceiveMessages {
    return {
        type: constants.RECEIVE_CHAT_MESSAGES,
        messages,
    };
}

export function addChatMessage(message): AddMessage {
    return {
        type: constants.ADD_CHAT_MESSAGE,
        message,
    };
}

export function getAllChatMessages() {
    return async (dispatch) => {
        try {
            const data = await axios.get(`/messages`);
            dispatch(receiveAllChatMessages(data.data));
        } catch (error) {
            dispatch(throwError("Could not get messages", error));
        }
    };
}

export function postChatMessage(message: string) {
    return async (dispatch) => {
        try {
            const data = { message };
            await axios.post(`/messages`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
        } catch (error) {
            dispatch(throwError("Could not post message", error));
        }
    };
}
