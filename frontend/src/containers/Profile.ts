import { connect, Dispatch } from "react-redux";
import { Store } from "redux";
import * as actions from "../actions/";
import {editProfile, profileFetchData} from "../actions/Profile";
import Profile from "../components/Profile";
import { StoreState } from "../types";

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
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
