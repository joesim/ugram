import { AppBar, Drawer, MenuItem } from "material-ui";
import IconButton from "material-ui/IconButton";
import * as React from "react";
import UploadModal from "../containers/UploadModal";
import SearchBar from "./SearchBar";

import FontIcon from "material-ui/FontIcon";
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from "material-ui/Toolbar";
import { Link } from "react-router-dom";

class AppBarUgram extends React.Component<any, any> {
	constructor(props) {
		super(props);
	}

	public onLogout = () => {
		window.localStorage.clear();
		location.href = "/#/login";
		this.forceUpdate();
	}

	public render() {
		let userConnected = null;
		let uploadImage = null;
		let logout = null;
		let webcamPage = null;
		if (window.localStorage.getItem("userId-06") !== null) {
			const link = "/#/users/" + window.localStorage.getItem("userId-06");
			userConnected = (
				<IconButton onClick={() => document.location.href = link}>
					<FontIcon className="material-icons">person</FontIcon>
				</IconButton>
			);
			webcamPage = (
				<IconButton onClick={() => document.location.href = "/#/webcam"}>
					<FontIcon className="material-icons">photo_camera</FontIcon>
				</IconButton>
			);
			uploadImage = (
                <IconButton onClick={this.props.onFileUploadModalClick}>
                    <FontIcon className="material-icons">file_upload</FontIcon>
                </IconButton>
			);
			logout = (
                <IconButton onClick={this.onLogout} className="logout">
	                <FontIcon className="material-icons">exit_to_app</FontIcon>
                </IconButton>
			);
		}
		const group = (
			<IconButton onClick={() => document.location.href = "/#/users"}>
				<FontIcon className="material-icons">group</FontIcon>
			</IconButton>
		);

		return (
            <div>
                <UploadModal visibility={this.props.appbar.upload.isVisible} visibilityFunc={this.props.onFileUploadModalClick} />
                <div className="navbar">
                    <div className="container flex-justify-between flex-align-items-center height-100">
                        <div>
                            <Link to="/" className="no-decoration">
                                <div className="title-navbar">UGram</div>
                            </Link>
                        </div>
                        <SearchBar />
                        <div>
	                        {uploadImage}
	                        {webcamPage}
	                        {group}
	                        {userConnected}
	                        {logout}
                        </div>
                    </div>
                </div>
            </div>
		);
	}
}

export default AppBarUgram;
