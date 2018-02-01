import * as constants from "../constants";

export interface StoreState {
    appbar: {
        menu: {
            isVisible: boolean;
        };
    }
    routing: {
        location: any;
    };
}
