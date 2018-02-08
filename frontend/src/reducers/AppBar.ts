import { AppBarAction } from "../actions";
import { SET_VISIBILITY_MENU, SET_VISIBILITY_UPLOAD_MODAL } from "../constants";

const initialState = {
        menu: {
            isVisible: false,
        },
        upload: {
            isVisible: false,
        },
};

export function appbar(state = initialState, action: AppBarAction): object {
    switch (action.type) {
        case SET_VISIBILITY_MENU:
            state.menu.isVisible = !state.menu.isVisible;
            return { ...state };
        case SET_VISIBILITY_UPLOAD_MODAL:
            state.upload.isVisible = ! state.upload;
            return { ...state };
        default:
            return state;
    }
}
