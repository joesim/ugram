import Avatar from "material-ui/Avatar";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import FileUpload from "material-ui/svg-icons/file/file-upload";
import * as React from "react";

interface IComponentNameProps {
    visibility: boolean;
    visibilityFunc: any;
}

export default class UploadModal extends React.Component<IComponentNameProps, any> {
    constructor(props: IComponentNameProps) {
        super(props);
    }
    public handleClose = () => {
        this.props.visibilityFunc();
      }

    public render(): JSX.Element {
        const actions = [
            (
                <FlatButton
                  label="Cancel"
                  primary={true}
                  onClick={this.handleClose}
                />
            ),
            (
                <FlatButton
                  label="Submit"
                  primary={true}
                  disabled={true}
                  onClick={this.handleClose}
                />
            ),
        ];

        return (
            <Dialog
              title="Upload an image"
              actions={actions}
              modal={true}
              open={this.props.visibility}
            >
              <Avatar icon={<FileUpload />} />
            </Dialog>
        );
    }
}
