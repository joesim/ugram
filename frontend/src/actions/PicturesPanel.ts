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

function getPictures(pictures:any, page:number): GetPictures {
    return {
        page,
        pictures,
        type: "GET_PICTURES",
    };
}

function getPicturesFromUser(pictures:any, page:number): GetPicturesFromUser {
    return {
        page,
        pictures,
        type: "GET_PICTURES_USER",
    };
}

function fetchAllPictures(page:number, perPage:number) {
    return axios.get(`/pictures?page=${page}&perPage=${perPage}`);
}

function fetchAllPicturesFromUser(page:number, perPage:number, userId:string) {
    return axios.get(`/users/${userId}/pictures?page=${page}&perPage=${perPage}`);
}

export function getAllPictures(page:number, perPage:number) {
    return async (dispatch) => {
        return fetchAllPictures(page, perPage).then(
            (pictures) => dispatch(getPictures(pictures, page)),
            (error) => dispatch(throwError("Get all pictures", error)),
        );
    };
}

export function getAllPicturesFromUser(page:number, perPage:number, userId:string) {
    return async (dispatch) => {
        return fetchAllPicturesFromUser(page, perPage, userId).then(
            (pictures) => dispatch(getPicturesFromUser(pictures, page)),
            (error) => dispatch(throwError("Get all pictures from user", error)),
        );
    };
}

export function getAllPicturesFilteredDesc(query:string, page:number, perPage:number) {
    return async (dispatch) => {
        axios.get(`/search?q=${query}&picturesOnly=true`).then(
            (pictures) => dispatch(getPictures(pictures, page)),
            (error) => dispatch(throwError("Get all pictures from user filtered by description", error)),
        );
    };
}

export function getAllPicturesFilteredHashtags(query:string, page:number, perPage:number) {
    return async (dispatch) => {
        axios.get(`/search?q=${query}&mentionsOnly=true`).then(
            (pictures) => dispatch(getPictures(pictures, page)),
            (error) => dispatch(throwError("Get all pictures from user filtered by hashtags", error)),
        );
    };
}
