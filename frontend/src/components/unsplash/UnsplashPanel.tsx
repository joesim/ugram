/***************************************
 ** O-rizon development
 ** Created by Julien Wawrzyniak
 ** 4/6/18 - 12:13 AM
 ** UnsplashPanel.jsx
 ** 2018 - All rights reserved
 ***************************************/

import * as React from "react";
import * as QueryString from "query-string";
import Unsplash from "unsplash-js";
import {BottomNavigation, BottomNavigationItem} from "material-ui/BottomNavigation";
import UnsplashAuth from "./UnsplashAuth";
import toJson from "../../toJson";

class UnsplashPanel extends React.Component<any, any> {
	public state = {
		unsplash: new Unsplash({
			applicationId: "fa07f718dd9ce0fb8db48f9985fcaddb944b618f0c6960d765dcc78c266654a2",
			callbackUrl: "http://localhost:8080",
			secret: "f1dffafebe6086721ca22331e02b91c2acb44a3307c8578b9a248b7b6e588953",
		}),
	};

	public checkUrlBearer() {
		const urlObj = QueryString.parseUrl(window.location.href);

		if (urlObj.query.code === undefined) {
			const bearerToken = localStorage.getItem("unsplashBearer");
			return (bearerToken != null) ? true : false;
		}

		const code = urlObj.query.code.replace("#/", "");
		this.state.unsplash.auth.userAuthentication(code)
			.then(toJson)
			.then((json) => {
				if (json.access_token) {
					localStorage.setItem("unsplashBearer", json.access_token);
					document.location.href = "/";
				}
			});
		return true;
	}

	public isAuthenticated() {
		if (!this.checkUrlBearer()) {
			return <UnsplashAuth />;
		}
		return this.props.content;
	}

	public render() {
		const panel = this.isAuthenticated();
		return (
			<div id="unsplashPanel">
				{panel}
			</div>
		);
	}
}

export default UnsplashPanel;
