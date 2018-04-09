import * as React from "react";
import ImageGallery from "react-image-gallery";

class UnsplashPhotos extends React.Component<any, any> {
	constructor(props) {
		super(props);

		this.state = {
			photos: this.props.photos,
		};
	}

	public render() {
		if (this.props.photos === undefined || this.props.photos.length === 0) {
			return null;
		}
		return (
			<div id="unsplashPhotos">
				<ImageGallery items={this.props.photos} showThumbnails={false} />
			</div>
		);
	}
}

export default UnsplashPhotos;
