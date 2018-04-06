import { connect, Dispatch } from "react-redux";
import * as actions from "../actions/Profile";
import {editProfile, profileFetchData, removeProfile} from "../actions/Profile";
import Profile from "../components/Profile";

export function mapStateToProps( state ) {
    return {
        error: state.profileHasErrored,
        user: state.user,
    };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.ProfilePanelActions>) {
    return {
        editProfile: (id, user) => dispatch(editProfile(id, user)),
        fetchData: (id) => dispatch(profileFetchData(id)),
        removeProfile: (id) => dispatch(removeProfile(id)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
