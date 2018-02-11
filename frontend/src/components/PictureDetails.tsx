import DatePicker from "material-ui/DatePicker";
import Dialog from "material-ui/Dialog";
import DropDownMenu from "material-ui/DropDownMenu";
import FlatButton from "material-ui/FlatButton";
import FloatingActionButton from "material-ui/FloatingActionButton";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import TextField from "material-ui/TextField";
import PropTypes from "prop-types";
import * as React from "react";

class PictureDetails extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
	        display: "image",
	        mentions: [],
	        open: false,
	        tags: [],
            userId: window.localStorage.getItem("userId-06"),
            value: [],
        };

        this.displayImage = this.displayImage.bind(this);
        this.displayInfos = this.displayInfos.bind(this);
        this.addValueDialog = this.addValueDialog.bind(this);
        this.displayDialog = this.displayDialog.bind(this);
        this.dialogMentions = this.dialogMentions.bind(this);
        this.dialogTags = this.dialogTags.bind(this);
        this.updatePicture = this.updatePicture.bind(this);
        this.deletePicture = this.deletePicture.bind(this);
    }

	public render() {
		if (this.props.picture === null) { return <div/>; }
		const actions = [
			(
                <FlatButton
                    key={1}
                    label="Image"
                    primary={true}
                    disabled={this.state.display === "image"}
                    onClick={() => {this.setState({display: "image"}); }}
                />
			),
			(
                <FlatButton
                    key={2}
                    label="Infos"
                    primary={true}
                    disabled={this.state.display === "infos"}
                    onClick={() => {this.setState({display: "infos"}); }}
                />
			),
			(
                <FlatButton
                    key={3}
                    label="Close"
                    primary={true}
                    onClick={this.props.closeDialog}
                />
			),
		];

		return (
            <Dialog
                title={this.props.picture.description}
                actions={actions}
                autoScrollBodyContent={true}
                contentStyle={{
					maxWidth: "none",
					width: "100%",
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
		);
	}

    private deletePicture() {
        this.props.deletePicture(this.state.userId, this.props.picture.id);
    }

    private updatePicture() {
        const data = {
	        description: document.getElementById("dialog")["value"],
            mentions: this.props.picture.mentions,
            tags: this.props.picture.tags,
        };
        this.props.picture.description = data.description;
        this.props.editPicture(this.state.userId, this.props.picture.id);
    }

    private dialogMentions() {
        this.setState({
	        open: true,
            value: this.props.picture.mentions,
        });
    }

    private dialogTags() {
        this.setState({
	        open: true,
            value: this.props.picture.tags,
        });
    }

    private addValueDialog() {
        this.state.value.push(document.getElementById("dialog")["value"]);
    }

    private displayDialog() {
        const actions = [
            (
                <FlatButton
                    key={1}
                    label="Close"
                    primary={true}
                    onClick={() => {this.setState({open: false}); }}
                />
            ),
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
        );
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
                                <MenuItem value={mention} key={index} primaryText={mention}/>,
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
                                    <MenuItem value={tag} key={index} primaryText={tag}/>,
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
        );
    }

    private displayImage() {
        if (this.state.display !== "image") {
            return this.displayInfos();
        }
        return (
            <div className="image">
                <img src={this.props.picture.url} />
            </div>
        );
    }
}

export default PictureDetails;
