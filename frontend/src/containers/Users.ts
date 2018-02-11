import { connect } from "react-redux";
import * as actions from "../actions/";
import Users from "../components/Users";
import { User } from "../types/";

interface StateProps {
    users: User[];
}

interface DispatchProps {
    getAllUsers: () => void;
}

function mapStateToProps(state): StateProps {
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
