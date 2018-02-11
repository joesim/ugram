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
		editPicture: (userId, pictureId, data) => dispatch(actions.editPicture(userId, pictureId, data)),
		deletePicture: (userId, pictureId) => dispatch(actions.deletePicture(userId, pictureId)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(PictureDetails);
