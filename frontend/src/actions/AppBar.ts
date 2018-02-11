import * as constants from "../constants";

export interface SetVisibilityUploadModal {
    type: constants.SET_VISIBILITY_UPLOAD_MODAL;
}

export type AppBarAction = SetVisibilityUploadModal;

export function setVisibilityUploadModal(): SetVisibilityUploadModal {
    return {
        type: constants.SET_VISIBILITY_UPLOAD_MODAL,
    };
}
