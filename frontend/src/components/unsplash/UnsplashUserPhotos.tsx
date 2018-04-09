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
				applicationId: "fa07f718dd9ce0fb8db48f9985fcaddb944b618f0c6960d765dcc78c266654a2",
				bearerToken: localStorage.getItem("unsplashBearer"),
				secret: "f1dffafebe6086721ca22331e02b91c2acb44a3307c8578b9a248b7b6e588953",
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
