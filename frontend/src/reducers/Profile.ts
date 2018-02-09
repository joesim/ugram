import { PROFILE_FETCH_DATA_SUCCESS } from "../constants";
import { GET_USER, EDIT_PROFILE, THROW_ERROR } from "../constants";
import { ProfilePanelActions } from "../actions";

export function user(state = {}, action: ProfilePanelActions) {
    switch (action.type) {
        case PROFILE_FETCH_DATA_SUCCESS:
            return action.user;
        default:
            return state;
    }
}