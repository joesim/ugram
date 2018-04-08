import { connect, Dispatch } from "react-redux";
import { HomeAction } from "../actions/Home";
import Home from "../components/Home";

export function mapStateToProps() {
	return {
	};
}

export function mapDispatchToProps(dispatch: Dispatch<HomeAction>) {
	return {
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
