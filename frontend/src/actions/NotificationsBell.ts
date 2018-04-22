import axios from "axios";
import { throwError } from "./Errors";

function formatNotifs(notifs) {
    const results = {
        comments: [],
        reactions: [],
    };

    for (const notif of notifs.items) {
        if (notif.type === "comment") {
            results.comments.push(notif.id);
        } else if (notif.type === "reaction") {
            results.reactions.push(notif.id);
        }
    }
    return results;
}

export function markAllReadNotifications(notifs, userId, dispatch) {
    const results = formatNotifs(notifs);
    axios.put(`/users/${userId}/pictures/notifications`, results)
			.catch((error) => {
				dispatch(throwError("Sorry! There was an error updating the notifications unread count", error));
			});
}
