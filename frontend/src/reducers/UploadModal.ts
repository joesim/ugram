import { UploadModalAction } from "../actions";
import { UPLOAD_PICTURE } from "../constants";

const initialState = {
    error: null
};

export function picture_details(state = initialState, action): object {
    switch (action.type) {
    case UPLOAD_PICTURE:
        location.reload();
        return { ...state };
    default:
        return state;
    }
}