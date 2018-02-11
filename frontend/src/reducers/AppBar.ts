import { AppBarAction } from "../actions";
import { SET_VISIBILITY_UPLOAD_MODAL } from "../constants";

const initialState = {
        upload: {
            isVisible: false,
        },
};

export function appbar(state = initialState, action: AppBarAction): object {
    switch (action.type) {
        case SET_VISIBILITY_UPLOAD_MODAL:
            state.upload.isVisible = !state.upload.isVisible;
            return { ...state };
        default:
            return state;
    }
}
