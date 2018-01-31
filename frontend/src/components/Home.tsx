import * as React from "react";
import {
	HashRouter,
	Link
} from "react-router-dom";
import PicturesPanel from "../containers/PicturesPanel";

const Home = ({}) => {
	return (
		<div>
			<PicturesPanel test={1}/>
		</div>
	);
};

export default Home;
