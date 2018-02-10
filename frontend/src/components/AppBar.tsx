import { AppBar, Drawer, MenuItem } from "material-ui";
import Avatar from "material-ui/Avatar";
import Dialog from "material-ui/Dialog";
import FileUpload from "material-ui/svg-icons/file/file-upload";
import * as React from "react";
import UploadModal from "./UploadModal";

import { Link } from "react-router-dom";

const AppBarUgram = ( { appbar, onLeftIconButtonClick, onFileUploadModalClick }: any) => {
    return (
        <div>
            <AppBar
                title="Ugram"
                onLeftIconButtonClick={onLeftIconButtonClick}
                iconElementRight={<Avatar icon={<FileUpload />} />}
                onRightIconButtonClick={onFileUploadModalClick}
            />
            <UploadModal
                visibility={appbar.upload.isVisible}
                visibilityFunc={onFileUploadModalClick}
            />
            <Drawer open={appbar.menu.isVisible}>
                <AppBar
                    title="Ugram"
                    onLeftIconButtonClick={onLeftIconButtonClick}
                />
                <Link to="/pictures"><MenuItem>Pictures</MenuItem></Link>
                <Link to="/profile"><MenuItem>Profile</MenuItem></Link>
                <Link to="/users"><MenuItem>Users</MenuItem></Link>
            </Drawer>
        </div>
    );
};

export default AppBarUgram;
