import { UploadModalAction } from "../actions";
import { UPLOAD_PICTURE } from "../constants";

const initialState = {
    error: null,
};

export function upload_picture(state = initialState, action): object {
    switch (action.type) {
    case UPLOAD_PICTURE:
        location.reload();
        return { ...state };
    default:
        return state;
    }
}
