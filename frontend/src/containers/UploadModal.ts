import { connect, Dispatch } from "react-redux";
import * as actions from "../actions/";
import UploadModal from "../components/UploadModal";
import { StoreState } from "../types";

export function mapStateToProps({ appbar }, props: StoreState) {
    return {
        appbar,
        ...props,
    };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.AppBarAction>) {
    return {
        onTest: () => console.log("test1"),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadModal);
