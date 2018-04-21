import { connect, Dispatch, PropTypes } from "react-redux";
import * as actions from "../actions/Login";
import Login from "../components/Login";

export function mapStateToProps({login}) {
	return {
		login,
	};
}

export function mapDispatchToProps(dispatch: Dispatch<actions.LoginAction>) {
	return {
		loginUser: (formData) => dispatch(actions.loginUser(formData)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
