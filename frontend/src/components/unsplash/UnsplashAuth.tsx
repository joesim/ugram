import Unsplash from "unsplash-js";
import * as React from "react";
import RaisedButton from "material-ui/RaisedButton";

class UnsplashAuth extends React.Component<any, any> {
	constructor(props) {
		super(props);
		this.state = {
			unsplash: new Unsplash({
				applicationId: "fa07f718dd9ce0fb8db48f9985fcaddb944b618f0c6960d765dcc78c266654a2",
				callbackUrl: "http://localhost:8080",
				secret: "f1dffafebe6086721ca22331e02b91c2acb44a3307c8578b9a248b7b6e588953",
			}),
		};
	}

	public render() {
		return (
			<div id="unsplashAuth">
				<RaisedButton label="Login Unsplash" primary={true} onClick={() => this.auth(this.state)} />
			</div>
		);
	}

	private auth(state) {
		const authenticationUrl = state.unsplash.auth.getAuthenticationUrl([
			"public",
			"read_user",
			"read_photos",
		]);
		location.assign(authenticationUrl);
	}
}

export default UnsplashAuth;
