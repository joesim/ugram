import * as React from "react";
import {
	HashRouter,
	Link,
} from "react-router-dom";
import PicturesPanel from "../containers/PicturesPanel";

const Home = ({}) => {
	return (
		<div>
			<div className="container">
			<PicturesPanel />
			</div>
		</div>
	);
};

export default Home;
