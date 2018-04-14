import { connect, Dispatch } from "react-redux";
import * as actions from "../actions/UploadModal";
import WebcamPage from "../components/Webcam";
import { StoreState } from "../types";

export function mapStateToProps({ appbar }, props: StoreState) {
	return {
		appbar,
		...props,
	};
}

export function mapDispatchToProps(dispatch: Dispatch<actions.UploadModalAction>) {
	return {
		submitImage: (pictureModel, file) =>  dispatch(actions.uploadPicture(pictureModel, file)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(WebcamPage);
