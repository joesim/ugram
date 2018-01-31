import { connect, Dispatch } from "react-redux";
import {profileFetchData, editProfile} from "../actions/Profile";
import { StoreState } from "../types";
import Profile from "../components/Profile";

export function mapStateToProps( state ) {
    return {
        user: state.user,
        hasErrored: state.profileHasErrored,
        isLoading: state.profileIsLoading
    };
}

export function mapDispatchToProps(dispatch: any) {
    return {
        fetchData: () => dispatch(profileFetchData()),
        editProfile: (user) => dispatch(editProfile(user))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
