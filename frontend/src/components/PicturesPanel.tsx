import * as React from "react";
import { isUndefined } from "util";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import PictureDetails from '../containers/PictureDetails';

interface Props {
	pictures_panel: any,
	getAllPictures: any,
	userId?: string,
	getAllPicturesFromUser: any,
}

class PicturesPanel extends React.Component<Props, any> {

	public constructor(props) {
		super(props)
		this.state = {
			page: 0,
			perPage: 20,
			loading: "hidden",
			open: false,
			pictureDetails: null,
		}
		this.handleOnScroll = this.handleOnScroll.bind(this);
		this.getColumnPictures = this.getColumnPictures.bind(this);
		this.openDialog = this.openDialog.bind(this);
		this.closeDialog = this.closeDialog.bind(this);
	}

	public componentDidMount() {
		if (isUndefined(this.props.userId)) {
			this.setState((prevState) => {
				return {page: prevState.page + 1}
			});
			this.props.getAllPictures(this.state.page, this.state.perPage)
		}
		else {
			this.props.getAllPicturesFromUser(this.state.page, this.state.perPage, this.props.userId)
		}
		window.addEventListener("scroll", this.handleOnScroll);
	}

	public componentWillUnmount() {
		window.removeEventListener("scroll", this.handleOnScroll);
	}

	private closeDialog() {
		this.setState({open: false});
	}

	private openDialog(indexPicture) {
		this.setState({open: true, pictureDetails: this.props.pictures_panel.pictures[indexPicture]})
	}

	private filterByDate(pictures) {
		pictures.sort((a, b) => {
			return b.createdDate - a.createdDate;
		});

		return pictures;
	}

	private handleOnScroll() {
		let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
		let scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
		let clientHeight = document.documentElement.clientHeight || window.innerHeight;
		let scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

		if (scrolledToBottom) {
			this.setState((prevState) => {
				return {page: prevState.page + 1}
			});
			this.props.getAllPictures(this.state.page, this.state.perPage)
			this.setState({loading: ""});
			setTimeout(() => {
				this.setState({loading: "hidden"})
			}, 2500)
		}
	}

	private handleImgError(error) {
		error.target.remove();
	}

	private getColumnPictures(pictures, startInd, step) {
		const column = [];

		for (let i = startInd; i < pictures.length; i += step) {
			column.push(
				<a onClick={() => {this.openDialog(i)}}>
					<img className="picture" src={pictures[i].img} onError={this.handleImgError} style={{ width: "100%" }} />
				</a>
			)
		}

		return column;
	}

	public render() {
		let pictures = [];

		this.props.pictures_panel.pictures.forEach((pic, index) => {
			pictures.push({
				img: pic.url,
				author: pic.userId,
				createdDate: new Date(pic.createdDate),
			});
		});

		pictures = this.filterByDate(pictures);

		let col1 = this.getColumnPictures(pictures, 0, 3);
		let col2 = this.getColumnPictures(pictures, 1, 3);
		let col3 = this.getColumnPictures(pictures, 2, 3);

		return (
			<div className="pictures-panel">
				<div className="row">
					<div className="column">
						{col1}
					</div>
					<div className="column">
						{col2}
					</div>
					<div className="column">
						{col3}
					</div>
				</div>
				<div className="loader">
					<i className="material-icons rotating" style={{
						visibility: this.state.loading,
					}}>cached</i>
				</div>
				<PictureDetails
					open={this.state.open}
					closeDialog={this.closeDialog}
					picture={this.state.pictureDetails}
				/>
			</div>
		)
	}
};

export default PicturesPanel;

