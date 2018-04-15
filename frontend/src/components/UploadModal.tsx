import Avatar from "material-ui/Avatar";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import FileUpload from "material-ui/svg-icons/file/file-upload";
import TextField from "material-ui/TextField";
import * as React from "react";

interface IProps {
	visibility: boolean;
	visibilityFunc: any;
	submitImage: any;
}
interface IPictureModel {
	description: string;
	mentions: string[];
	tags: string[];
}

export default class UploadModal extends React.Component<IProps, any> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			description: "",
			file: File,
			mentions: [],
			tags: [],
			userId: window.localStorage.getItem("userId-06"),
		};
	}

	public handleClose = () => {

		this.props.visibilityFunc();
	  }

	public uploadImage = (e) => {
		this.setState({
			file: e.target.files[0],
		});
	}

	public setDescription = (e) => {
		this.setState({
			description: e.target.value,
		});

	}

	public setMentions = (e) => {
		this.setState({
			mentions: e.target.value.split(" "),
		});

	}

	public setTags = (e) => {
		this.setState({
			tags: e.target.value.split(" "),
		});

	}

	public submitImage = () => {
		const pictureModel: IPictureModel = {
			description: this.state.description,
			mentions: this.state.mentions,
			tags: this.state.tags,

		};
		const file = this.state.file;
		this.handleClose();
		this.props.submitImage(pictureModel, file);
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
				  onClick={this.submitImage}
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
			<div className="formUpload">
				<RaisedButton
					containerElement="label"
					label="Choose an Image"
					labelPosition="before"
					primary={true}
				>
					<input
						type="file"
						onChange={this.uploadImage}
						className="imageInput"
					/>
				</RaisedButton>
				<TextField
					hintText="Descriptions"
					multiLine="true"
					onChange={this.setDescription}
				/>
				<TextField
					hintText="Mentions separate by space"
					onChange={this.setMentions}
				/>
				<TextField
					hintText="Tags separate by space"
					onChange={this.setTags}
				/>
			</div>
			</Dialog>
		);
	}
}
