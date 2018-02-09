import { connect, Dispatch } from "react-redux";
import * as actions from "../actions/";
import UploadModal from "../components/UploadModal";
import { StoreState } from "../types";

export function mapStateToProps({ appbar }: StoreState) {
    return {
        appbar,
    };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.AppBarAction>) {
    return {
        onFileUploadModalClick: () => dispatch(actions.setVisibilityUploadModal()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadModal);
