import { AppBarAction } from "../actions";
import { SET_VISIBILITY_MENU } from "../constants";

const initialState = {
        menu: {
            isVisible: false,
        },
};

export function appbar(state = initialState, action: AppBarAction): object {
    switch (action.type) {
        case SET_VISIBILITY_MENU:
            state.menu.isVisible = !state.menu.isVisible;
            return { ...state };
        default:
            return state;
    }
}