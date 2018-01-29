import { connect, Dispatch } from "react-redux";
import * as actions from "../actions/";
import AppBarUgram from "../components/Appbar";
import { StoreState } from "../types";

export function mapStateToProps({ appbar }: StoreState) {
    return {
        appbar,
    };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.AppBarAction>) {
    return {
        onLeftIconButtonClick: () => dispatch(actions.setVisibilityMenu()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppBarUgram);
