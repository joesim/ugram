import axios from "../axios";
import * as constants from "../constants";
import { User } from "../types/";
import { throwError } from "./Errors";

interface ReceiveSearch {
    type: constants.RECEIVE_SEARCH;
    searchResults: any;
}

function receiveSearch(searchResults): ReceiveSearch {
    return {
        type: constants.RECEIVE_SEARCH,
        searchResults,
    };
}

export function getSearchResults(query) {
    return async (dispatch) => {
        axios.defaults.baseURL = "http://localhost:3000";
        axios.get(`/search`).then(
            (search) => dispatch(receiveSearch(search.data)),
            (error) => dispatch(throwError("Get search results from every category", error)),
        );
        axios.defaults.baseURL = "http://api.ugram.net";
        
    };
}
