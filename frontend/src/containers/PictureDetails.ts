import { connect, Dispatch, PropTypes } from "react-redux";
import * as actions from "../actions/PictureDetails";
import PictureDetails from "../components/PictureDetails";

export function mapStateToProps({ picture_details }, props) {
    return {
        picture_details,
        ...props,
    };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.PictureDetailsAction>) {
    return {
        deletePicture: (userId, pictureId) => dispatch(actions.deletePicture(userId, pictureId)),
        editPicture: (userId, pictureId, data) => dispatch(actions.editPicture(userId, pictureId, data)),
        sendCommentary: (userId, pictureId, data) => dispatch(actions.sendCommentary(userId, pictureId, data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PictureDetails);
