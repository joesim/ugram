import { connect } from "react-redux";
import * as actions from "../actions/Users";
import Users from "../components/Users";

interface StateProps {
	users: object,
}

interface DispatchProps {
	getAllUsers: () => void,
}

function mapStateToProps(state) : StateProps {
	return {
		users: state.users.users,
	};
}

function mapDispatchToProps(dispatch): DispatchProps {
	return {
		getAllUsers: () => dispatch(actions.getAllUsers()),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);