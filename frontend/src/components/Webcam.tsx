import * as React from "react";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";

interface WebcamPageProps {
	submitImage: any;
}

interface WebcamPageState {
	photo: string;
	videoSrc: string;
	videoWidth: number;
	videoHeight: number;
	mentions: string[];
	tags: string[];
	description: string;
	audioVisible?: any;
}

interface PictureModel {
	description: string;
	mentions: string[];
	tags: string[];
}

export default class WebcamPage extends React.Component<WebcamPageProps, WebcamPageState> {

	constructor(props: any) {
		super(props);
		this.state = {
			photo: null,
			videoSrc: null,
			videoWidth: 320,
			videoHeight: 240,
			mentions: [],
			tags: [],
			description: "",
		};
		this.capture = this.capture.bind(this);
	}

	public capture(webcam) {
		this.setState({
			photo: webcam.getScreenshot(),
		});
	}

	public async componentDidMount() {
		navigator.getUserMedia = navigator.getUserMedia
			|| navigator["webkitGetUserMedia"]
			|| navigator["mozGetUserMedia"]
			|| navigator["msGetUserMedia"]
			|| navigator["oGetUserMedia"];
		if (navigator.getUserMedia) {
			navigator.getUserMedia(this.getUserMediaConstraints(), this.handleVideo, (err) => err);
		}
	}

	public getUserMediaConstraints = () => {
		return {
			audio: this.state.audioVisible,
			video: {
				width: this.state.videoWidth,
				height: this.state.videoHeight,
			},
		};
	}

	public handleVideo = (stream) => {
		window["stream"] = stream;
		this.setState({ videoSrc: window.URL.createObjectURL(stream) });
	}

	public takePhoto = () => {
		const canvasElement = document.createElement("canvas");
		const videoElement: any = document.getElementById("video-world-camera");
		canvasElement.width = videoElement["videoWidth"];
		canvasElement.height = videoElement["videoHeight"];
		canvasElement.getContext("2d")
			.drawImage(videoElement, 0, 0, videoElement["videoWidth"], videoElement["videoHeight"]);
		const dataURI = canvasElement.toDataURL("image/jpeg");
		this.setState({
			photo: dataURI,
		});
	}

	public submitImage = () => {
		const pictureModel: PictureModel = {
			description: this.state.description,
			mentions: this.state.mentions,
			tags: this.state.tags,

		};

		const urltoFile = (url, filename, mimeType) => {
			mimeType = mimeType || (url.match(/^data:([^;]+);/) || "")[1];
			return (fetch(url)
					.then((res) => {
						return res.arrayBuffer();
					})
					.then((buf) => {
						return new File([buf], filename, { type: mimeType });
					})
			);
		};

		urltoFile(this.state.photo, `screenshot-${Math.floor(Math.random() * 10000)}.jpg`, "image/jpeg")
			.then((file) => {
				this.props.submitImage(pictureModel, file);
			});
	}

	public reload = () => {
		this.setState({
			photo: null,
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

	public render() {
		let video = null;
		let button = null;
		let upload = false;
		if (this.state.photo === null) {
			video = <video id="video-world-camera" src={this.state.videoSrc} autoPlay={true} />;
			button = (
				<RaisedButton
					containerElement="label"
					label="Take photo"
					labelPosition="before"
					onClick={this.takePhoto}
					primary={true}
				/>
			);
			upload = true;
		} else {
			video = <img src={this.state.photo} />;
			button = (
				<RaisedButton
					containerElement="label"
					label="Reload"
					labelPosition="before"
					onClick={this.reload}
					primary={true}
				/>
			);
		}

		return (
			<div id="WebcamPage">
				<div className="containerWebcam">
					<div className="webcam">
						{video}
					</div>
					{button}
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
					<RaisedButton
						containerElement="label"
						label="Upload"
						disabled={upload}
						labelPosition="before"
						onClick={this.submitImage}
						primary={true}
					/>
				</div>
			</div>
		);
	}
}
