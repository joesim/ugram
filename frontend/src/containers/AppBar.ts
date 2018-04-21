import { connect, Dispatch } from "react-redux";
import { AppBarAction, setVisibilityUploadModal } from "../actions/AppBar";
import AppBarUgram from "../components/AppBar";
import { StoreState } from "../types";

export function mapStateToProps({ appbar }: StoreState) {
    return {
        appbar,
    };
}

export function mapDispatchToProps(dispatch: Dispatch<AppBarAction>) {
    return {
        onFileUploadModalClick: () => dispatch(setVisibilityUploadModal()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppBarUgram);
