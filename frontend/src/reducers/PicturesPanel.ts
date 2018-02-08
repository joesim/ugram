import { PicturesPanelAction } from "../actions";
import { GET_PICTURES, FETCH_ERROR } from "../constants"

const initialState = {
	pictures: [],
	error: null
};

export function pictures_panel(state = initialState, action): object {
	switch (action.type) {
		case GET_PICTURES:
			state.pictures = [...state.pictures, ...action.pictures.data.items];
			return { ...state };
		case FETCH_ERROR:
			state.error = action.error;
			return { ...state };
		default:
			return state;
	}
}