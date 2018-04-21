import { connect } from "react-redux";
import * as actions from "../actions/SearchAll";
import SearchAll from "../components/SearchAll";

function mapStateToProps(state) {
    return {
        searchResults: state.searchResults,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getSearchResults: (query) => dispatch(actions.getSearchResults(query)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchAll);
