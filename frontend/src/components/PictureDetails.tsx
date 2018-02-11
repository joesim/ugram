import * as React from "react";
import PropTypes from "prop-types";
import FlatButton from "material-ui/FlatButton";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import DatePicker from "material-ui/DatePicker";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

class PictureDetails extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            userId: window.localStorage.getItem("userId-06"),
            display: "image",
            mentions: [],
            tags: [],
            open: false,
            value: [],
        }

        this.displayImage = this.displayImage.bind(this);
        this.displayInfos = this.displayInfos.bind(this);
        this.addValueDialog = this.addValueDialog.bind(this);
        this.displayDialog = this.displayDialog.bind(this);
        this.dialogMentions = this.dialogMentions.bind(this);
        this.dialogTags = this.dialogTags.bind(this);
        this.updatePicture = this.updatePicture.bind(this);
        this.deletePicture = this.deletePicture.bind(this);
    }

    private deletePicture() {
        this.props.deletePicture(this.state.userId, this.props.picture.id);
    }

    private updatePicture() {
        let data = {
            mentions: this.props.picture.mentions,
            tags: this.props.picture.tags,
            description: document.getElementById("description")["value"],
        };
        this.props.picture.description = data.description;
        this.props.editPicture(this.state.userId, this.props.picture.id);
    }

    private dialogMentions() {
        this.setState({
            value: this.props.picture.mentions,
            open: true,
        })
    }

    private dialogTags() {
        this.setState({
            value: this.props.picture.tags,
            open: true,
        })
    }

    private addValueDialog() {
        this.state.value.push(document.getElementById("dialog")["value"])
    }

    private displayDialog() {
        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onClick={() => {this.setState({open: false})}}
            />
        ];

        return (
            <Dialog
                open={this.state.open}
                actions={actions}
            >
                <div className="dialog-edit">
                    <TextField id="dialog" className="field-width"/>
                    <RaisedButton  primary={true} label="Add" onClick={this.addValueDialog}/>
                </div>
            </Dialog>
        )
    }

    private displayInfos() {

        const disable = this.state.userId.toLowerCase() !== this.props.picture.userId.toLowerCase();

        return (
            <div>
                <div className="picture-infos">
                    <div className="field-name">Name: </div>
                    <TextField
                        defaultValue={this.props.picture.userId}
                        className="field"
                    />
                </div>
                <div className="picture-infos">
                    <div className="field-name">Description: </div>
                    <TextField
                        defaultValue={this.props.picture.description}
                        multiLine={true}
                        className="field"
                        id="description"
                    />
                </div>
                <div className="picture-infos">
                    <div className="field-name">Created at: </div>
                    <DatePicker
                        defaultDate={new Date(this.props.picture.createdDate)}
                        className="field"
                    />
                </div>
                <div className="picture-infos">
                    <div className="field-name">Mentions: </div>
                    <div  className="field-dropdown">
                    <DropDownMenu maxHeight={150}>
                        {
                            this.props.picture.mentions.map((mention, index) =>
                                <MenuItem value={mention} key={index} primaryText={mention}/>
                            )
                        }
                    </DropDownMenu>
                    <FloatingActionButton disabled={disable} onClick={this.dialogMentions} mini={true} zDepth={1}>
                        <ContentAdd />
                    </FloatingActionButton>
                    </div>
                </div>
                <div className="picture-infos">
                    <div className="field-name">Tags: </div>
                    <div className="field-dropdown">
                        <DropDownMenu maxHeight={150}>
                            {
                                this.props.picture.tags.map((tag, index) =>
                                    <MenuItem value={tag} key={index} primaryText={tag}/>
                                )
                            }
                        </DropDownMenu>
                        <FloatingActionButton disabled={disable} onClick={this.dialogTags} mini={true} zDepth={1}>
                            <ContentAdd />
                        </FloatingActionButton>
                    </div>
                </div>
                <div className="update-button">
                    <RaisedButton
                        disabled={disable}
                        label="Delete"
                        secondary={true}
                        className="size-button"
                        onClick={this.deletePicture}
                    />
                    <RaisedButton
                        disabled={disable}
                        label="Update"
                        primary={true}
                        className="size-button"
                        onClick={this.updatePicture}
                    />
                </div>
                {this.displayDialog()}
            </div>
        )
    }

    private displayImage() {
        if (this.state.display !== "image")
            return this.displayInfos();
        return (
            <div className="image">
                <img src={this.props.picture.url} />
            </div>
        )
    }

    public render() {
        if (this.props.picture === null) return <div/>;
        const actions = [
            <FlatButton
                label="Image"
                primary={true}
                disabled={this.state.display === "image"}
                onClick={() => {this.setState({display: "image"})}}
            />,
            <FlatButton
                label="Infos"
                primary={true}
                disabled={this.state.display === "infos"}
                onClick={() => {this.setState({display: "infos"})}}
            />,
            <FlatButton
                label="Close"
                primary={true}
                onClick={this.props.closeDialog}
            />
        ];

        return (
            <Dialog
                title="Picture details"
                actions={actions}
                autoScrollBodyContent={true}
                contentStyle={{
                    width: "100%",
                    maxWidth: "none",
                }}
                modal={true}
                open={this.props.open}
            >
                <div className="picture-details">
                    {
                        this.displayImage()
                    }
                </div>
            </Dialog>
        )
    }
}

export default PictureDetails;
