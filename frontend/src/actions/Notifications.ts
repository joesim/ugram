import * as constants from "../constants";

export interface NEWNOTIFICATION {
    type: constants.NEW_NOTIFICATION;
    message: string;
}

export interface CLOSENOTIFICATION {
    type: constants.CLOSE_NOTIFICATION;
}

export type NotificationsActions = NEWNOTIFICATION | CLOSENOTIFICATION;

function sendNotif(message: string): NEWNOTIFICATION  {
    return {
        message,
        type: constants.NEW_NOTIFICATION,
    };
}

function closeNotif(): CLOSENOTIFICATION {
    return {
        type: constants.CLOSE_NOTIFICATION,
    };
}

export function sendNotification(message: string) {
    return (dispatch) => {
        dispatch(sendNotif(message));
    };
}

export function sendNotificationDispatch(message: string, dispatch) {
    dispatch(sendNotif(message));
}

export function closeNotification() {
    return (dispatch) => {
        dispatch(closeNotif());
    };
}
