import { ProfilePanelActions } from "../actions/";
import { EDIT_PROFILE, GET_USER, THROW_ERROR } from "../constants";
import { PROFILE_FETCH_DATA_SUCCESS } from "../constants";

export function user(state = {}, action: ProfilePanelActions) {
    switch (action.type) {
        case PROFILE_FETCH_DATA_SUCCESS:
            return action.user;
        default:
            return state;
    }
}
