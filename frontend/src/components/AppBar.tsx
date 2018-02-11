import * as React from "react";

import { AppBar, Drawer, MenuItem } from "material-ui";
import FontIcon from 'material-ui/FontIcon';

import { Link } from "react-router-dom";
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
const stle = {
    width: "950px"
}

const AppBarUgram = ({ appbar, onLeftIconButtonClick }: any) => {
    return (
        <div>
            <div className="navbar">
                <div className="container flex-justify-between flex-align-items-center height-100">
                    <Link to="/" className="no-decoration"><div className="items-navbar title-navbar">UGram</div></Link>
                    <div>
                    <Link to="/"><FontIcon className="material-icons items-navbar">collections</FontIcon></Link>
                    <Link to="/"><FontIcon className="material-icons items-navbar">group</FontIcon></Link>
                    <Link to="/"><FontIcon className="material-icons items-navbar">person</FontIcon></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppBarUgram;
