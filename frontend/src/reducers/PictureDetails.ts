import { PictureDetailsAction } from "../actions";
import { UPDATE_PICTURE, DELETE_PICTURE, FETCH_ERROR } from "../constants"

const initialState = {
	error: null
};

export function picture_details(state = initialState, action): object {
	switch (action.type) {
		case UPDATE_PICTURE:
			return { ...state };
		case DELETE_PICTURE:
			location.reload();
			return { ...state };
		case FETCH_ERROR:
			state.error = action.error;
			return { ...state };
		default:
			return state;
	}
}