import { connect } from "react-redux";
import * as actions from "../actions/";
import Users from "../components/Users";
import { User } from "../types/";

interface StateProps {
    users: User[];
}

interface DispatchProps {
    getAllUsers: (page, perPage) => any;
    getAllUsersFiltered: (query, page, perPage) => any;
    receivingNewUsers: () => any;
}

function mapStateToProps(state): StateProps {
    return {
        users: state.users.users,
    };
}

function mapDispatchToProps(dispatch): DispatchProps {
    return {
        getAllUsers: (page, perPage) => dispatch(actions.getAllUsers(page, perPage)),
        getAllUsersFiltered: (query, page, perPage) => dispatch(actions.getAllUsersFiltered(query, page, perPage)),
        receivingNewUsers: () => dispatch(actions.receivingNewUsers())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
