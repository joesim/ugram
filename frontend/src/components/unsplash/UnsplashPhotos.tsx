import * as React from "react";
import ImageGallery from "react-image-gallery";

interface Photo {
	original: string;
}

interface UnsplashPhotosProps {
	photos: Photo[];
	className?: string;
}

class UnsplashPhotos extends React.Component<UnsplashPhotosProps, {}> {
	constructor(props) {
		super(props);
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
