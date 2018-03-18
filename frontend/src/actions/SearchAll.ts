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

export function getSearchResults(query: string) {
    return async (dispatch) => {
        axios.get(`/search?q=${query}`)
        .then((response) => {
            dispatch(receiveSearch(response.data));
        })
        .catch((error) => {
            dispatch(throwError("Get search results from every category", error));
        });        
    };
}
