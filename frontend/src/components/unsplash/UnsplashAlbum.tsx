import Unsplash from "unsplash-js";
import * as React from "react";
import UnsplashProfile from "./UnsplashProfile";
import UnsplashUserPhotos from "./UnsplashUserPhotos";
import UnsplashError from "./UnsplashError";
import toJson from "../../toJson";

class UnsplashAlbum extends React.Component<any, any> {
	constructor(props) {
		super(props);

		this.state = {
			error: null,
			profile: null,
			unsplash: new Unsplash({
				applicationId: "fa07f718dd9ce0fb8db48f9985fcaddb944b618f0c6960d765dcc78c266654a2",
				bearerToken: localStorage.getItem("unsplashBearer"),
				secret: "f1dffafebe6086721ca22331e02b91c2acb44a3307c8578b9a248b7b6e588953",
			}),
		};
		this.fetchProfile = this.fetchProfile.bind(this);
		this.fetchProfile();
	}

	public fetchProfile() {
		this.state.unsplash.currentUser.profile()
			.then(toJson)
			.then((json) => {
				if (json.errors) {
					this.setState({ error: json.errors[0] });
					return null;
				}
				this.setState({
					profile: json,
				});
			});
	}

	public render() {
		if (this.state.profile === null) {
			return <UnsplashError error={this.state.error} />;
		}
		return (
			<div id="unsplashAlbum">
				<UnsplashProfile profile={this.state.profile} />
				<UnsplashUserPhotos profile={this.state.profile} />
			</div>
		);
	}
}

export default UnsplashAlbum;
