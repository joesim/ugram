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

export interface FetchError {
	type: constants.FETCH_ERROR;
	customMessage: string;
	error: object;
}

