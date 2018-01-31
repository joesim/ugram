import { connect, Dispatch } from "react-redux";
import {profileFetchData} from "../actions/Profile";
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
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
