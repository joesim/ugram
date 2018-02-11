import * as constants from "../constants";

export interface StoreState {
    appbar: {
        uploadModal: {
            isVisible: boolean;
        },
    };
    routing: {
        location: any;
    };
}
