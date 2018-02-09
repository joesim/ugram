import { PicturesPanelAction } from "../actions";
import { GET_PICTURES, FETCH_ERROR, GET_PICTURES_USER } from "../constants"

const initialState = {
	pictures: [],
	error: null
};

export function pictures_panel(state = initialState, action): object {
	switch (action.type) {
		case GET_PICTURES:
			if (action.page === 0)
				state.pictures = [];
			state.pictures = [...state.pictures, ...action.pictures.data.items];
			return { ...state };
		case GET_PICTURES_USER:
			if (action.page === 0)
				state.pictures = [];
			state.pictures = [...state.pictures, ...action.pictures.data.items];
			return { ...state };
		case FETCH_ERROR:
			state.error = action.error;
			return { ...state };
		default:
			return state;
	}
}