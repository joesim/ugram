import DatePicker from "material-ui/DatePicker";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import IconButton from "material-ui/IconButton";
import FontIcon from "material-ui/FontIcon";
import TextField from "material-ui/TextField";
import * as React from "react";
import { blue500, grey500 } from "material-ui/styles/colors";
import axios from "../axios";

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
        this.displayComms = this.displayComms.bind(this);
        this.updatePicture = this.updatePicture.bind(this);
        this.deletePicture = this.deletePicture.bind(this);
        this.sendComms = this.sendComms.bind(this);
        this.updateReaction = this.updateReaction.bind(this);
        this.pictureIsLikedByCurrentUser = this.pictureIsLikedByCurrentUser.bind(this);
    }

    public componentWillReceiveProps(nextProps) {
        if (this.props.picture !== nextProps.picture) {
           axios.get(`/users/${nextProps.picture.userId}/pictures/${nextProps.picture.id}`)
               .then((response) => {
                   const currentUser = response.data.reactions.find((r) => r.author === this.state.userId);
                   const like = currentUser !== undefined;
                   if (like !== this.state.like) {
                       this.setState({ like });
                   }
               });
        }
    }

	public render() {
        if (this.props.picture === null) { return <div/>; }
        const actions = [
            (
                <div>
                    <IconButton onClick={this.updateReaction} className="like">
                        <FontIcon
                            color={this.state.like ? blue500 : grey500}
                            onLeftIconButtonClick=""
                            className="material-icons"
                            id="likeThumb"
                        >
                            thumb_up
                        </FontIcon>
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
                    label="Commentaires"
                    primary={true}
                    onClick={() => {this.setState({display: "commentaires"}); }}
                />
            ),
			(
                <FlatButton
                    key={5}
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

    private pictureIsLikedByCurrentUser(nextProps) {
        let result = false;
        if (nextProps.picture !== null && nextProps.picture.reactions !== null) {
            const reactions = nextProps.picture.reactions;
            let i = 0;
            while (i < reactions.length && result === false) {
                if (reactions[i].author === this.state.userId) {
                    result = true;
                }
                i++;
            }
        }
        return result;
    }

    private deletePicture() {
        this.props.deletePicture(this.state.userId, this.props.picture.id);
    }

    private updateReaction() {
        const previousState = this.state.like;
        this.props.updateReaction(this.props.picture.userId, this.props.picture.id);
        this.setState({like: !previousState});
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

    private sendComms() {
        const data = {
            message: document.getElementById("commentary")["value"],
        };
        this.props.sendCommentary(this.state.userId, this.props.picture.id, data);
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
            case "commentaires":
                return this.displayComms();
            default:
                return (
                    <div className="image">
                        <img src={this.props.picture.url_p} />
                    </div>
                );
        }
    }

    private displayComms() {
        console.log(this.props.picture);
        return (
            <div className="picture-infos">
                <div className="field-name">Commentaire: </div>
                <TextField
                    multiLine={true}
                    className="field"
                    id="commentary"
                />
                <RaisedButton
                    label="Send"
                    primary={true}
                    className="size-button"
                    onClick={this.sendComms}
                />
            </div>
        );
    }

    private download() {
        window.open(this.props.picture.url);
        this.setState({display: "image"});
    }
}

export default PictureDetails;
