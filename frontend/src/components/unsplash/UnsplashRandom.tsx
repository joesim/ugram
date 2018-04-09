import Unsplash from "unsplash-js";
import * as React from "react";
import IconButton from "material-ui/IconButton";
import ActionCached from "material-ui/svg-icons/action/cached";
import UnsplashPhotos from "./UnsplashPhotos";
import UnsplashError from "./UnsplashError";
import toJson from "../../toJson";

interface Photo {
	original: string;
}

interface UnsplashRandomState {
	error: any;
	photos: Photo[];
	unsplash: any;
}

class UnsplashRandom extends React.Component<{}, UnsplashRandomState> {
	constructor(props) {
		super(props);

		this.state = {
			error: null,
			photos: [],
			unsplash: new Unsplash({
				bearerToken: localStorage.getItem("unsplashBearer"),
			}),
		};
		this.fetchRandomPhotos = this.fetchRandomPhotos.bind(this);
		this.fetchRandomPhotos(5);
	}

	public fetchRandomPhotos(count) {
		const photos = [];
		this.state.unsplash.photos.getRandomPhoto({ count, height: 400, width: 400 })
			.then(toJson)
			.then((json) => {
				if (json.errors) {
					this.setState({
						error: <UnsplashError error={json.errors[0]} />,
					});
					return null;
				}
				json.forEach((img) => {
					photos.push({
						original: img.urls.small,
					});
				});
				this.setState({
					photos,
				});
			});
	}

	public render() {
		if (this.state.error !== null) {
			return this.state.error;
		}
		return (
			<div id="unsplashRandom">
				<IconButton
					className="reload"
					onClick={() => this.fetchRandomPhotos(5)}
				>
					<ActionCached/>
				</IconButton>
				<div className="gallery">
					<UnsplashPhotos photos={this.state.photos} />
				</div>
			</div>
		);
	}
}

export default UnsplashRandom;
