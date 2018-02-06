import * as React from "react";
import PropTypes from "prop-types";
import TextField from "material-ui/TextField";
import Chip from "material-ui/Chip";

class PictureDetails extends React.Component<any, any> {
	constructor(props) {
		super(props);
	}

	public render() {
		const date = new Date(this.props.picture.createdDate);

		const mentions = [];
		const tags = [];

		this.props.picture.mentions.forEach((mention) => {
			mentions.push(
				<a className="mention"><b>@{mention} </b></a>
			);
		});

		this.props.picture.tags.forEach((tag) => {
			tags.push(
				<div>#{tag}</div>
			);
		});

		return (
			<div className="picture-details">
				<div className="image">
					<img src={this.props.picture.url} />
				</div>
				<div className="details">
					<div>
						<b>User: </b>{this.props.picture.userId}
					</div>
					<br/>
					<div>
						<b>Date: </b> {date.toDateString()}
					</div>
					<br/>
					<div>
						<b>Description: </b> <span>{this.props.picture.description}</span>
					</div>
					<br/>
					<div>
						<b>Mentions: </b>{mentions}
					</div>
					<br/>
					<div>
						<b>Tags: </b>{tags}
					</div>
				</div>
			</div>
		)
	}
}

export { PictureDetails };
