import Unsplash from "unsplash-js";
import * as React from "react";
import IconButton from "material-ui/IconButton";
import ActionCached from "material-ui/svg-icons/action/cached";
import UnsplashPhotos from "./UnsplashPhotos";
import UnsplashError from "./UnsplashError";
import toJson from "../../toJson";

class UnsplashRandom extends React.Component<any, any> {
	constructor(props) {
		super(props);

		this.state = {
			error: null,
			photos: [],
			unsplash: new Unsplash({
				applicationId: "fa07f718dd9ce0fb8db48f9985fcaddb944b618f0c6960d765dcc78c266654a2",
				bearerToken: localStorage.getItem("unsplashBearer"),
				secret: "f1dffafebe6086721ca22331e02b91c2acb44a3307c8578b9a248b7b6e588953",
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
