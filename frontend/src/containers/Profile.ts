import { connect, Dispatch } from "react-redux";
import {profileFetchData, editProfile} from "../actions/Profile";
import { StoreState } from "../types";
import * as actions from "../actions/";
import { Store } from "redux";
import Profile from "../components/Profile";

export function mapStateToProps( state ) {
    return {
        user: state.user,
        error: state.profileHasErrored
    };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.ProfilePanelActions>) {
    return {
        fetchData: (id) => dispatch(profileFetchData(id)),
        editProfile: (id, user) => dispatch(editProfile(id, user))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
