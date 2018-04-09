import Unsplash from "unsplash-js";
import * as React from "react";
import UnsplashProfile from "./UnsplashProfile";
import UnsplashUserPhotos from "./UnsplashUserPhotos";
import UnsplashError from "./UnsplashError";
import toJson from "../../toJson";

interface UnsplashAlbumState {
	error: any;
	profile: {
		downloads: number,
		followers_count: number,
		total_likes: number,
		name: string,
		username: string,
	};
	unsplash: any;
}

class UnsplashAlbum extends React.Component<{}, UnsplashAlbumState> {
	constructor(props) {
		super(props);

		this.state = {
			error: null,
			profile: null,
			unsplash: new Unsplash({
				bearerToken: localStorage.getItem("unsplashBearer"),
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
