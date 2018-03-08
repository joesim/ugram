import { AppBar, Drawer, MenuItem } from "material-ui";
import Avatar from "material-ui/Avatar";
import Dialog from "material-ui/Dialog";
import IconButton from "material-ui/IconButton";
import FileUpload from "material-ui/svg-icons/file/file-upload";
import * as React from "react";
import UploadModal from "../containers/UploadModal";

import FontIcon from "material-ui/FontIcon";
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from "material-ui/Toolbar";
import { Link } from "react-router-dom";

const widthSearchBar = {
    width: "200px"
}

const inlineBlock = {
    display: "inline-block"
}

const AppBarUgram = ({ appbar, onFileUploadModalClick }: any) => {

    let userConnected = null;
    let uploadImage = null;
    if (window.localStorage.getItem("userId-06") !== null) {
        const link = "/users/" + window.localStorage.getItem("userId-06");
        userConnected = <Link to={link}><FontIcon className="material-icons items-navbar">person</FontIcon></Link>;
        uploadImage = (
            <IconButton onClick={onFileUploadModalClick} className="upload">
                <FontIcon onLeftIconButtonClick="" className="material-icons items-navbar">file_upload</FontIcon>
            </IconButton>
        );
    }

    return (
        <div>
            <UploadModal
                visibility={appbar.upload.isVisible}
                visibilityFunc={onFileUploadModalClick}
            />
            <div className="navbar">
                <div className="container flex-justify-between flex-align-items-center height-100">
                    <div >
                        <Link to="/" className="no-decoration"><div className="items-navbar title-navbar">UGram</div></Link>
                    </div>
                    <div className="width-search">
                            <div className="search">
                                <input type="text" className="searchTerm" placeholder="Search" />
                                <button type="submit" className="searchButton">
                                    <Link to="/search"><FontIcon className="material-icons">search</FontIcon></Link>
                                </button>
                            </div>
                        </div>
                    <div>
                        <Link to="/users"><FontIcon className="material-icons items-navbar">group</FontIcon></Link>
                        {userConnected}
                        {uploadImage}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppBarUgram;
