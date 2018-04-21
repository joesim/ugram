import { ProfilePanelActions } from "../actions/Profile";
import { PROFILE_FETCH_DATA_SUCCESS, REMOVE_PROFILE_SUCCESS } from "../constants";

export function user(state = {}, action: ProfilePanelActions) {
    switch (action.type) {
        case PROFILE_FETCH_DATA_SUCCESS:
            return action.user;
        case REMOVE_PROFILE_SUCCESS:
	        window.localStorage.clear();
	        location.reload();
	        return action.user;
        default:
            return state;
    }
}
