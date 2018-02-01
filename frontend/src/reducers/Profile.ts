import {PROFILE_HAS_ERRORED, PROFILE_IS_LOADING, PROFILE_FETCH_DATA_SUCCESS} from "../constants";
import { GET_USER, EDIT_PROFILE, FETCH_ERROR } from "../constants";
import {ProfilePanelActions} from "../actions";

export function profileHasErrored(state = {hasErrored:false, errorMessage: undefined}, action: ProfilePanelActions) {
    switch (action.type) {
        case PROFILE_HAS_ERRORED:
            return {
                hasErrored: action.hasErrored,
                errorMessage: action.errorMessage
            }
        default:
            return state;
    }
}

export function profileIsLoading(state = true, action: ProfilePanelActions) {
    switch (action.type) {
        case PROFILE_IS_LOADING:
            return action.isLoading;
        default:
            return state;
    }
}

export function user(state = {}, action: ProfilePanelActions) {
    switch (action.type) {
        case PROFILE_FETCH_DATA_SUCCESS:
            return action.user;
        default:
            return state;
    }
}