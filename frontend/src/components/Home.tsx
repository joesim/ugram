import * as React from "react";
import FontIcon from "material-ui/FontIcon";
import {
	HashRouter,
	Link,
} from "react-router-dom";
import {Tabs, Tab} from "material-ui/Tabs";
import PicturesPanel from "../containers/PicturesPanel";
import UnsplashPanel from "./unsplash/UnsplashPanel";
import UnsplashRandom from "./unsplash/UnsplashRandom";
import UnsplashAlbum from "./unsplash/UnsplashAlbum";

class Home extends React.Component {
	public render() {
		return (
			<div>
				<Tabs>
					<Tab icon={<FontIcon className="material-icons">photo_library</FontIcon>}>
						<div className="container">
							<PicturesPanel />
						</div>
					</Tab>
					<Tab icon={<FontIcon className="material-icons">photo_album</FontIcon>}>
						<UnsplashPanel content={<UnsplashAlbum />} />
					</Tab>
					<Tab icon={<FontIcon className="material-icons">shuffle</FontIcon>}>
						<UnsplashPanel content={<UnsplashRandom />} />
					</Tab>
				</Tabs>
			</div>
		);
	}
}

export default Home;
