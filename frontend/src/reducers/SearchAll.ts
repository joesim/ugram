import { RECEIVE_SEARCH } from "../constants";

export function searchResults(state = {}, action: any) {
    switch (action.type) {
        case RECEIVE_SEARCH:
            return action.searchResults;
        default:
            return state;
    }
}
