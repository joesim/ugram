import * as React from "react";

import { AppBar, Drawer, MenuItem } from "material-ui";

import { Link } from "react-router-dom";

const AppBarUgram = ( { appbar, onLeftIconButtonClick }: any) => {
    return (
        <div>
            <AppBar
                title="Ugram"
                onLeftIconButtonClick={onLeftIconButtonClick}
            />
            <Drawer open={appbar.menu.isVisible}>
                <AppBar
                    title="Ugram"
                    onLeftIconButtonClick={onLeftIconButtonClick}
                />
                <Link to="/pictures"><MenuItem>Pictures</MenuItem></Link>
                <Link to="/profile"><MenuItem>Profile</MenuItem></Link>
            </Drawer>
        </div>
    );
};

export default AppBarUgram;
