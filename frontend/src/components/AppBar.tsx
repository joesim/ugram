import { AppBar, Drawer, MenuItem } from "material-ui";
import Avatar from "material-ui/Avatar";
import Dialog from "material-ui/Dialog";
import IconButton from "material-ui/IconButton";
import FileUpload from "material-ui/svg-icons/file/file-upload";
import * as React from "react";
import UploadModal from "../containers/UploadModal";
import SearchBar from "./SearchBar";
import RaisedButton from "material-ui/RaisedButton";

import FontIcon from "material-ui/FontIcon";
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from "material-ui/Toolbar";
import { Link } from "react-router-dom";

const widthSearchBar = {
    width: "200px"
}

const inlineBlock = {
    display: "inline-block"
}

class AppBarUgram extends React.Component<any, any> {
	constructor(props) {
		super(props);
	}

	public onLogout = () => {
		window.localStorage.clear();
		this.forceUpdate();
	};

	public render() {
		let userConnected = null;
		let uploadImage = null;
		let logout = null;
		if (window.localStorage.getItem("userId-06") !== null) {
			const link = "/users/" + window.localStorage.getItem("userId-06");
			userConnected = <Link to={link}><FontIcon className="material-icons items-navbar">person</FontIcon></Link>;
			uploadImage = (
                <IconButton onClick={this.props.onFileUploadModalClick} className="upload"> <FontIcon
                    onLeftIconButtonClick="" className="material-icons items-navbar">file_upload</FontIcon>
                </IconButton>
			);
			logout = (
                <IconButton onClick={this.onLogout} href="/#/login" className="upload"> <FontIcon
                    onLeftIconButtonClick="" className="material-icons items-navbar">exit_to_app</FontIcon>
                </IconButton>
			);
		}

		return (
            <div>
                <UploadModal visibility={this.props.appbar.upload.isVisible}
                             visibilityFunc={this.props.onFileUploadModalClick} />
                <div className="navbar">
                    <div className="container flex-justify-between flex-align-items-center height-100">
                        <div>
                            <Link to="/" className="no-decoration">
                                <div className="items-navbar title-navbar">UGram</div>
                            </Link>
                        </div>
                        <SearchBar />
                        <div>
                            <Link to="/users"><FontIcon
                                className="material-icons items-navbar">group</FontIcon></Link> {userConnected} {uploadImage} {logout}
                        </div>
                    </div>
                </div>
            </div>
		);
	}
}

export default AppBarUgram;
