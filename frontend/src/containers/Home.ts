import { connect, Dispatch } from "react-redux";
import * as actions from "../actions/";
import Home from "../components/Home";
import { StoreState } from "../types";

export function mapStateToProps() {
	return {
	};
}

export function mapDispatchToProps(dispatch: Dispatch<actions.HomeAction>) {
	return {
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
