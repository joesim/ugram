import { connect, Dispatch, PropTypes } from "react-redux";
import * as actions from "../actions/";
import PicturesPanel from "../components/PicturesPanel";
import { StoreState } from "../types";

export function mapStateToProps({ pictures_panel }, props) {
    return {
        pictures_panel,
        ...props,
    };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.PicturesPanelAction>) {
    return {
        getAllPictures: (page, perPage) => dispatch(actions.getAllPictures(page, perPage)),
        getAllPicturesFromUser: (page, perPage, userId) => {
            dispatch(actions.getAllPicturesFromUser(page, perPage, userId));
        },

        getAllPicturesFilteredDesc: (query, page, perPage) => {
            dispatch(actions.getAllPicturesFilteredDesc(query, page, perPage));
        },
        getAllPicturesFilteredHashtags: (query, page, perPage) => {
            dispatch(actions.getAllPicturesFilteredHashtags(query, page, perPage));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PicturesPanel);
