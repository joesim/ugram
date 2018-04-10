import Unsplash from "unsplash-js";
import * as React from "react";
import RaisedButton from "material-ui/RaisedButton";
import { UNSPLASH_CALLBACK } from "../../constants";

interface UnsplashAuthState {
	unsplash: any;
}

class UnsplashAuth extends React.Component<{}, UnsplashAuthState> {
	constructor(props) {
		super(props);
		this.state = {
			unsplash: new Unsplash({
				applicationId: process.env.UNSPLASH_APPLICATION_ID,
				callbackUrl: UNSPLASH_CALLBACK,
				secret: process.env.UNSPLASH_SECRET,
			}),
		};
		this.auth = this.auth.bind(this);
	}

	public render() {
		return (
			<div id="unsplashAuth">
				<RaisedButton label="Login Unsplash" primary={true} onClick={() => this.auth()} />
			</div>
		);
	}

	private auth() {
		const authenticationUrl = this.state.unsplash.auth.getAuthenticationUrl([
			"public",
			"read_user",
			"read_photos",
		]);
		location.assign(authenticationUrl);
	}
}

export default UnsplashAuth;
