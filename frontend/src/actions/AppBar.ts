import * as constants from "../constants";

export interface SetVisibilityMenu {
    type: constants.SET_VISIBILITY_MENU;
}

export type AppBarAction = SetVisibilityMenu;

export function setVisibilityMenu(): SetVisibilityMenu {
    return {
        type: constants.SET_VISIBILITY_MENU,
    };
}

