import * as React from "react";
import { isUndefined } from "util";
import {
	GridList,
	GridTile
} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Paper from 'material-ui/Paper';
import {
	Card,
	CardActions,
	CardHeader,
	CardMedia,
	CardTitle,
	CardText
} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

interface Props {
	pictures_panel: any,
	getAllPictures: any,
	userToken?: string,
}

class PicturesPanel extends React.Component<Props, any> {

	public constructor(props) {
		super(props)
	}

	public componentDidMount() {
		if (isUndefined(this.props.userToken))
			this.props.getAllPictures()
	}

	public render() {

		let titlesData = [];

		this.props.pictures_panel.pictures.items.forEach((pic, index) => {
			if (index >= 0) {
				console.info(pic);
				titlesData.push({
					img: this.props.pictures_panel.pictures.items[1].url,
					title: "e",
					author: "22",
				});
				titlesData[0] = {
					img: this.props.pictures_panel.pictures.items[0].url,
					title: "e",
					author: "22",
				};
			}
		});

		console.log(titlesData)

		return (
			<div>
				{titlesData.map((tile) =>
					<a href="">
						<figure>
							<img src={tile.img} alt="" />
						</figure>
					</a>
				)}
				<a href="https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/placeimg02.jpg">
					<figure>
						<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/placeimg02.jpg" alt=""/>
					</figure>
				</a>
				<a href="https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/placeimg03.jpg">
					<figure>
						<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/placeimg03.jpg" alt=""/>
					</figure>
				</a>
				<a href="https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/placeimg04.jpg">
					<figure>
						<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/placeimg04.jpg" alt=""/>
					</figure>
				</a>
				<a href="https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/placeimg05.jpg">
					<figure>
						<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/placeimg05.jpg" alt=""/>
					</figure>
				</a>
				<a href="https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/placeimg06.jpg">
					<figure>
						<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/placeimg06.jpg" alt=""/>
					</figure>
				</a>
				<a href="https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/placeimg07.jpg">
					<figure>
						<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/placeimg07.jpg" alt=""/>
					</figure>
				</a>
				<a href="https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/placeimg08.jpg">
					<figure>
						<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/placeimg08.jpg" alt=""/>
					</figure>
				</a>
				<a href="https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/placeimg09.jpg">
					<figure>
						<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/placeimg09.jpg" alt=""/>
					</figure>
				</a>
				<a href="https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/placeimg10.jpg">
					<figure>
						<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/placeimg10.jpg" alt=""/>
					</figure>
				</a>
			</div>
	)
	}
};

export default PicturesPanel;

{/*<Paper zDepth={2} className="paper-pictures">*/}
{/*<div className="root-grid-list">*/}
{/*<Subheader className="subheader-pictures"><b>December</b></Subheader>*/}
{/*<GridList cols={1} className="grid-list">*/}
{/*{titlesData.map((tile) => (*/}
{/*<GridTile key={tile.img} title={tile.title}*/}
{/*actionIcon={<IconButton><StarBorder color="white" /></IconButton>}*/}
{/*actionPosition="left" titlePosition="top"*/}
{/*titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)">*/}
{/*<img src={tile.img} />*/}
{/*</GridTile>*/}
{/*))}*/}
{/*</GridList>*/}
{/*</div>*/}
{/*</Paper>*/}
{/*<Paper zDepth={2} className="paper-pictures">*/}
{/*<div className="root-grid-list">*/}
{/*<Subheader className="subheader-pictures"><b>December</b></Subheader>*/}
{/*<GridList cols={2.2} className="grid-list">*/}
{/*{titlesData.map((tile) => (*/}
{/*<GridTile key={tile.img} title={tile.title}*/}
{/*actionIcon={<IconButton><StarBorder color="white" /></IconButton>}*/}
{/*actionPosition="left" titlePosition="top"*/}
{/*titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)">*/}
{/*<img src={tile.img} />*/}
{/*</GridTile>*/}
{/*))}*/}
{/*</GridList>*/}
{/*</div>*/}
{/*</Paper>*/}