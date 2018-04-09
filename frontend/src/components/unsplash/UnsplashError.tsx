import * as React from "react";
import UnsplashAuth from "./UnsplashAuth";

class UnsplashError extends React.Component<any, any> {
	constructor(props) {
		super(props);

		this.state = {
			LIMIT: "You have reached the limit of requests per hour",
			UNKNOWN: "Something was wrong",
		};
	}

	public render() {
		if (this.props.error == null) {
			return null;
		}
		let error = null;
		if (this.props.error.indexOf("Limit") === -1) {
			if (this.props.error.indexOf("token") !== -1) {
				return <UnsplashAuth />;
			}
			error = this.state.UNKNOWN;
		} else {
			error = this.state.LIMIT;
		}
		return (
			<div id="unsplashError">
				<i className="material-icons errorIcon">do_not_disturb</i>
				<span className="message">{error}</span>
			</div>
		);
	}

}

export default UnsplashError;
