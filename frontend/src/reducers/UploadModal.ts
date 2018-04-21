import { UPLOAD_PICTURE } from "../constants";

const initialState = {
    error: null,
};

export function upload_picture(state = initialState, action): object {
    switch (action.type) {
    case UPLOAD_PICTURE:
        document.location.href = "/";
        return { ...state };
    default:
        return state;
    }
}
