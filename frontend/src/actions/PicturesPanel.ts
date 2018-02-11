import axios from "axios";
import * as constants from "../constants";
import { Pictures } from "../types/";
import { throwError } from "./Errors";

export interface GetPictures {
    type: constants.GET_PICTURES;
    pictures: Pictures;
    page: number;
}

export interface GetPicturesFromUser {
    type: constants.GET_PICTURES_USER;
    pictures: Pictures;
    page: number;
}

export type PicturesPanelAction = GetPictures | GetPicturesFromUser;

function getPictures(pictures, page): GetPictures {
    return {
        page,
        pictures,
        type: "GET_PICTURES",
    };
}

function getPicturesFromUser(pictures, page): GetPicturesFromUser {
    return {
        page,
        pictures,
        type: "GET_PICTURES_USER",
    };
}

function fetchAllPictures(page, perPage) {
    return axios.get(`http://api.ugram.net/pictures?page=${page}&perPage=${perPage}`);
}

function fetchAllPicturesFromUser(page, perPage, userId) {
    return axios.get(`http://api.ugram.net/users/${userId}/pictures?page=${page}&perPage=${perPage}`);
}

export function getAllPictures(page, perPage) {
    return (dispatch) => {
        return fetchAllPictures(page, perPage).then(
            (pictures) => dispatch(getPictures(pictures, page)),
            (error) => dispatch(throwError("Get all pictures", error)),
        );
    };
}

export function getAllPicturesFromUser(page, perPage, userId) {
    return (dispatch) => {
        return fetchAllPicturesFromUser(page, perPage, userId).then(
            (pictures) => dispatch(getPicturesFromUser(pictures, page)),
            (error) => dispatch(throwError("Get all pictures from user", error)),
        );
    };
}
