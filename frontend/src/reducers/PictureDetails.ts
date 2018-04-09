import { DELETE_PICTURE, THROW_ERROR, UPDATE_PICTURE, UPDATE_PICTURE_LIKE_STATE } from "../constants";

const initialState = {
    error: null,
};

export function picture_details(state = initialState, action): object {
    switch (action.type) {
        case UPDATE_PICTURE:
            return { ...state };
        case DELETE_PICTURE:
            window.location.reload();
            return { ...state };
        case UPDATE_PICTURE_LIKE_STATE: // TODO what?
            return { ...state };
        default:
            return state;
    }
}
