import { NotificationsActions } from "../actions/Notifications";
import { NEW_NOTIFICATION, CLOSE_NOTIFICATION } from "../constants";

const initialState = {
    message: "",
    open: false,
};

export function notifications(state = initialState, action: NotificationsActions) {
    switch (action.type) {
        case NEW_NOTIFICATION:
            return {
                message: action.message,
                open: true,
            };
        case CLOSE_NOTIFICATION:
            return {
                message: "",
                open: false,
            };
        default:
            return state;
    }
}
