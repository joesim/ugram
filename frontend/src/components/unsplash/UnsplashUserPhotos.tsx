import Unsplash from "unsplash-js";
import * as React from "react";
import UnsplashPhotos from "./UnsplashPhotos";
import toJson from "../../toJson";

class UnsplashUserPhotos extends React.Component<any, any> {
	constructor(props) {
		super(props);

		this.state = {
			currentImage: 0,
			page: 1,
			perPage: 10,
			photos: [],
			unsplash: new Unsplash({
				bearerToken: localStorage.getItem("unsplashBearer"),
			}),
			username: this.props.profile.username,
		};
		this.fetchUserPhotos = this.fetchUserPhotos.bind(this);
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
						thumbnail: img.urls.thumb,
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
			this.fetchUserPhotos();
			return null;
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
