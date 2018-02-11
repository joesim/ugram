import * as React from "react";

import { AppBar, Drawer, MenuItem } from "material-ui";
import FontIcon from 'material-ui/FontIcon';

import { Link } from "react-router-dom";
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
const stle = {
    width: "950px"
}

const AppBarUgram = ({ appbar, onLeftIconButtonClick }: any) => {

    let userConnected = null
    if (window.localStorage.getItem("userId-06")!==undefined){
        const link = "/users/" + window.localStorage.getItem("userId-06");
        userConnected = <Link to={link}><FontIcon className="material-icons items-navbar">person</FontIcon></Link>
    }

    return (
        <div>
            <div className="navbar">
                <div className="container flex-justify-between flex-align-items-center height-100">
                    <Link to="/" className="no-decoration"><div className="items-navbar title-navbar">UGram</div></Link>
                    <div>
                    <Link to="/users"><FontIcon className="material-icons items-navbar">group</FontIcon></Link>
                    {userConnected}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppBarUgram;
