import { GET_PICTURES, GET_PICTURES_USER } from "../constants";

const initialState = {
    error: null,
    pictures: [],
};

export function pictures_panel(state = initialState, action): object {
    switch (action.type) {
        case GET_PICTURES:
            if (action.page === 0) {
                state.pictures = [];
            }
            state.pictures = [...state.pictures, ...action.pictures.data.items];
            return { ...state };
        case GET_PICTURES_USER:
            if (action.page === 0) {
                state.pictures = [];
            }
            state.pictures = [...state.pictures, ...action.pictures.data.items];
            return { ...state };
        default:
            return state;
    }
}
