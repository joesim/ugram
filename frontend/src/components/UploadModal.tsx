import Avatar from "material-ui/Avatar";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import FileUpload from "material-ui/svg-icons/file/file-upload";
import TextField from "material-ui/TextField";
import * as React from "react";

interface IComponentNameProps {
    visibility: boolean;
    visibilityFunc: any;
    onTest: any;
}
interface IPictureModel {
    description: string;
    mentions: string[];
    tags: string[];
}

export default class UploadModal extends React.Component<IComponentNameProps, any> {
    private userId: string;
    private pictureModel: IPictureModel;
    private description: string;
    private mentions: string[];
    private tags: string[];

    constructor(props: IComponentNameProps) {
        super(props);
        this.state = {
            pictureModel: {
                description: "",
                mentions: [],
                tags: [],
            },
            userId: window.localStorage.getItem("userId-06"),
        };
    }
    public handleClose = () => {
        this.props.visibilityFunc();
        this.props.onTest();
      }

    public handleSubmit = () => {
        console.log("hello")
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
                  onClick={this.handleSubmit}
                />
            ),
        ];

        return (
            <Dialog
              title="Upload an image"
              actions={actions}
              modal={true}
              open={this.props.visibility}
              autoScrollBodyContent={true}
            >
                <Avatar icon={<FileUpload />} />
                <br />
                <TextField
                    hintText="Descriptions"
                    multiLine="true"
                    id="description-"
                />
                <TextField
                    hintText="Mentions"
                />
                <TextField
                    hintText="Tags"
                />
            </Dialog>
        );
    }
}
