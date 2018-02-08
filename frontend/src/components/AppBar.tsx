import { AppBar, Drawer, MenuItem } from "material-ui";
import Avatar from "material-ui/Avatar";
import Dialog from "material-ui/Dialog";
import FileUpload from "material-ui/svg-icons/file/file-upload";
import * as React from "react";

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
            <Dialog
              title="Upload an image"
              modal={true}
              open={appbar.menu.}
            >
            <Avatar icon={<FileUpload />} />
            </Dialog>
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
