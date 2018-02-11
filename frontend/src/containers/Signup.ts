import { connect, Dispatch, PropTypes } from "react-redux";
import * as actions from "../actions/";
import Signup from "../components/Signup";
import { StoreState } from "../types";

export function mapStateToProps({signup}) {
    return {
        signup,
    };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.SignupAction>) {
    return {
        signupUser: (formData) => dispatch(actions.signupUser(formData)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
