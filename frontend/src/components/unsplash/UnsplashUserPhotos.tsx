import Unsplash from "unsplash-js";
import * as React from "react";
import UnsplashPhotos from "./UnsplashPhotos";
import toJson from "../../toJson";

interface Profile {
	username: string;
}

interface Photo {
	original: string;
}

interface UnsplashUserPhotosProps {
	profile: Profile;
	className?: string;
}

interface UnsplashUserPhotosState {
	page: number;
	perPage: number;
	photos: Photo[];
	unsplash: any;
	username: string;
}

class UnsplashUserPhotos extends React.Component<UnsplashUserPhotosProps, UnsplashUserPhotosState> {
	constructor(props) {
		super(props);

		this.state = {
			page: 1,
			perPage: 10,
			photos: [],
			unsplash: new Unsplash({
				bearerToken: localStorage.getItem("unsplashBearer"),
			}),
			username: this.props.profile.username,
		};
		this.fetchUserPhotos = this.fetchUserPhotos.bind(this);
		this.fetchUserPhotos();
	}

	public fetchUserPhotos() {
		const photos = this.state.photos;

		this.state.unsplash.users.photos(this.state.username, this.state.page, this.state.perPage)
			.then(toJson)
			.then((json) => {
				if (json.errors) {
					return null;
				}
				json.forEach((img) => {
					photos.push({
						original: img.urls.regular,
					});
				});
				this.setState({
					page: this.state.page + 1,
					photos,
				});
			});
	}

	public render() {
		if (this.state.username === null) {
			return null;
		} else if (this.state.photos.length === 0) {
			return (
				<div id="unsplashUserPhotos">
					<h2>Photos 0</h2>
				</div>
				);
		}
		return (
			<div id="unsplashUserPhotos">
				<h2>Photos {this.state.photos.length}</h2>
				<div className="photos">
					<UnsplashPhotos className="gallery" photos={this.state.photos} />
				</div>
			</div>
		);
	}
}

export default UnsplashUserPhotos;
