import { connect, Dispatch, PropTypes } from "react-redux";
import * as actions from "../actions/";
import PicturesPanel from "../components/PicturesPanel";
import { StoreState } from "../types";

export function mapStateToProps({ pictures_panel }) {
	return {
		pictures_panel,
	};
}

export function mapDispatchToProps(dispatch: Dispatch<actions.PicturesPanelAction>) {
	return {
		getAllPictures: () => dispatch(actions.getAllPictures()),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(PicturesPanel);
