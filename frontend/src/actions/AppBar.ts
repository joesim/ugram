import * as constants from "../constants";

export interface SetVisibilityMenu {
    type: constants.SET_VISIBILITY_MENU;
}
export interface SetVisibilityUploadModal {
    type: constants.SET_VISIBILITY_UPLOAD_MODAL;
}

export type AppBarAction = SetVisibilityMenu;

export function setVisibilityMenu(): SetVisibilityMenu {
    return {
        type: constants.SET_VISIBILITY_MENU,
    };
}

export function setVisibilityUploadModal(): SetVisibilityUploadModal {
    return {
        type: constants.SET_VISIBILITY_UPLOAD_MODAL,
    };
}
