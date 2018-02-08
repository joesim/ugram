import { connect, Dispatch, PropTypes } from "react-redux";
import * as actions from "../actions/";
import PictureDetails from "../components/PictureDetails";
import { StoreState } from "../types";

export function mapStateToProps({ picture_details }, props) {
	return {
		picture_details,
		...props,
	};
}

export function mapDispatchToProps(dispatch: Dispatch<actions.PictureDetailsAction>) {
	return {
		editPicture: (userId, pictureId, data, token) => dispatch(actions.editPicture(userId, pictureId, data, token)),
		deletePicture: (userId, pictureId, token) => dispatch(actions.deletePicture(userId, pictureId, token)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(PictureDetails);
