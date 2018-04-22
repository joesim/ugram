import TextField from "material-ui/TextField";
import Paper from "material-ui/Paper";
import {List, ListItem} from "material-ui/List";
import Divider from "material-ui/Divider";
import Avatar from "material-ui/Avatar";
import { Message } from "../types/";
import * as React from "react";
import { socket } from "../Index";
import RaisedButton from "material-ui/RaisedButton";
import Popover, {PopoverAnimationVertical} from "material-ui/Popover";

interface Props {
    messages: Message[];
	getAllMessages: any;
	postMessage: any;
	addMessage: any;
}

class ChatMessages extends React.Component<Props, any> {
	public constructor(props) {
		super(props);

		this.state = {
			open: false,
		};

		this.onKeyPressed = this.onKeyPressed.bind(this);
		this.onExpand = this.onExpand.bind(this);
		this.onContract = this.onContract.bind(this);
	}

    public componentDidMount() {
		this.props.getAllMessages();

		socket.on("message", (data) => {
			this.props.addMessage(data);
		});
    }

	public render() {
		let messageKey = 0;

		if (this.props.messages !== undefined && this.props.messages.length > 0) {
			return (
			<div className="chatbox">
				<div className="chatbox-content">
					<Popover
						open={this.state.open}
						anchorEl={this.state.anchorEl}
						anchorOrigin={{horizontal: "left", vertical: "bottom"}}
						targetOrigin={{horizontal: "left", vertical: "top"}}
						onRequestClose={this.onContract}
						animation={PopoverAnimationVertical}
					>
						<Paper zDepth={2}>
							<List>
								{this.props.messages.map((message) =>
									<ListItem
										key={messageKey++}
										primaryText={`${message.userId}: ${message.message}`}
										className="chatbox-item"
									/>,
								)}
							</List>
							<Divider />
							<div className="chatbox-input">
								<TextField
									hintText=""
									fullWidth={true}
									onKeyDown={this.onKeyPressed}
								/>
							</div>
						</Paper>
					</Popover>
					<RaisedButton
						onClick={this.onExpand}
						label="Chatbox"
					/>
				</div>
			</div>
			);
		} else {
			return (
			<div className="chatbox">
				<Paper zDepth={2}>
					<div className="chatbox-input">
						<TextField
							hintText=""
							fullWidth={true}
							onKeyDown={this.onKeyPressed}
						/>
					</div>
				</Paper>
			</div>
			);
		}
	}

	private onExpand(event) {
		event.preventDefault();

		this.setState({
			open: true,
			anchorEl: event.currentTarget,
		});
	}

	private onContract(event) {
		this.setState({
			open: false,
		});
	}

	private onKeyPressed(event) {
		if (event.key === "Enter") {
			const message = event.target.value;
			if (message !== "") {
				this.props.postMessage(message);
			}
		}
	}
}

export default ChatMessages;
