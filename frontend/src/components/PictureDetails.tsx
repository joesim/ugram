import DatePicker from "material-ui/DatePicker";
import Dialog from "material-ui/Dialog";
import DropDownMenu from "material-ui/DropDownMenu";
import FlatButton from "material-ui/FlatButton";
import FloatingActionButton from "material-ui/FloatingActionButton";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import IconButton from "material-ui/IconButton";
import FontIcon from "material-ui/FontIcon";
import TextField from "material-ui/TextField";
import PropTypes from "prop-types";
import * as React from "react";
import { blue500, grey500 } from "material-ui/styles/colors";

class PictureDetails extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            display: "image",
            like: false,
	        mentions: [],
	        open: false,
	        tags: [],
            userId: window.localStorage.getItem("userId-06"),
            value: [],
        };

        this.download = this.download.bind(this);
        this.displayImage = this.displayImage.bind(this);
        this.displayInfos = this.displayInfos.bind(this);
        this.updatePicture = this.updatePicture.bind(this);
        this.deletePicture = this.deletePicture.bind(this);
        this.updateReaction = this.updateReaction.bind(this);
        this.pictureIsLikedByCurrentUser = this.pictureIsLikedByCurrentUser.bind(this);
    }

	public render() {
        if (this.props.picture === null) { return <div/>; }
        const actions = [
            (
                <div>
                    <IconButton onClick={this.updateReaction} className="like">
                        <FontIcon color={this.pictureIsLikedByCurrentUser() === true ? blue500 : grey500} onLeftIconButtonClick="" className="material-icons" id="likeThumb">thumb_up</FontIcon>
                    </IconButton>
                </div>
            ),
            (
                <FlatButton
                    key={1}
                    label="Download"
                    primary={true}
                    disabled={this.state.display === "download"}
                    onClick={() => {this.setState({display: "download"}); }}
                />
			),
			(
                <FlatButton
                    key={2}
                    label="Image"
                    primary={true}
                    disabled={this.state.display === "image"}
                    onClick={() => {this.setState({display: "image"}); }}
                />
			),
			(
                <FlatButton
                    key={3}
                    label="Infos"
                    primary={true}
                    disabled={this.state.display === "infos"}
                    onClick={() => {this.setState({display: "infos"}); }}
                />
			),
			(
                <FlatButton
                    key={4}
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

    private pictureIsLikedByCurrentUser() {
        let result = false;
        this.props.picture.reactions.every((reaction) => {
            if (reaction.author === this.state.userId) {
                result = true;
                return;
            }
        });
        return result;
    }

    private deletePicture() {
        this.props.deletePicture(this.state.userId, this.props.picture.id);
    }

    private updateReaction() {
        const thumb = document.getElementById("likeThumb");
        let previousColor;
        if (thumb !== null) {
            previousColor = thumb.style.color;
        }

        this.props.updateReaction(this.props.picture.userId, this.props.picture.id);

        thumb.style.color = this.getNewColor(previousColor);
    }

    private getNewColor(previousColor) {
        let newColor = previousColor;
        switch (previousColor) {
            case "rgb(158, 158, 158)":
                newColor = blue500;
                break;
            case "rgb(33, 150, 243)":
            default:
                newColor = grey500;
                break;
        }
        return newColor;
    }

    private updatePicture() {
	    this.props.picture.mentions = document.getElementById("mentions")["value"].split(" ");
	    this.props.picture.tags = document.getElementById("tags")["value"].split(" ");
	    const data = {
	        description: document.getElementById("description")["value"],
            mentions: this.props.picture.mentions,
            tags: this.props.picture.tags,
        };
	    this.props.picture.description = data.description;
	    this.props.editPicture(this.state.userId, this.props.picture.id, data);
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
                    <TextField
                        defaultValue={this.props.picture.mentions.join(" ")}
                        hintText="mentions separate by space"
                        multiLine={true}
                        className="field"
                        id="mentions"
                    />
                    </div>
                </div>
                <div className="picture-infos">
                    <div className="field-name">Tags: </div>
                    <div  className="field-dropdown">
                    <TextField
                        defaultValue={this.props.picture.tags.join(" ")}
                        hintText="tags separate by space"
                        multiLine={true}
                        className="field"
                        id="tags"
                    />
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
            </div>
        );
    }

    private displayImage() {
        switch (this.state.display) {
            case "download":
                this.download();

                return (
                    <div className="image">
                        <img src={this.props.picture.url_p} />
                    </div>
                );
            case "infos":
                return this.displayInfos();
            default:
                return (
                    <div className="image">
                        <img src={this.props.picture.url_p} />
                    </div>
                );
        }
    }

    private download() {
        window.open(this.props.picture.url);
        this.setState({display: "image"});
    }
}

export default PictureDetails;
