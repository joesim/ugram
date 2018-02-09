import Avatar from "material-ui/Avatar";
import Dialog from "material-ui/Dialog";
import FileUpload from "material-ui/svg-icons/file/file-upload";
import * as React from "react";

const UploadModal = ( {visibility}: any ) => {
    return (
        <Dialog
              title="Upload an image"
              modal={true}
              open={visibility}
        >
            <Avatar icon={<FileUpload />} />
        </Dialog>
    );
};

export default UploadModal;
