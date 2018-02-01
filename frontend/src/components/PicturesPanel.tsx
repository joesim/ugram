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

		const titlesData = [];

		this.props.pictures_panel.pictures.items.forEach((pic) => {
			titlesData.push({
				img: pic.url,
				title: "e",
				author: "22",
			})
		});


		return (
			<div className="flex-wrap-around">
				{titlesData.map((tile) => (
					<Card style={{ width: window.innerWidth / 3 - 15 }}
					      className="card-picture"
					>
						<CardMedia overlay={ <CardTitle title={tile.title} subtitle={tile.author}/>}>
							<img src={titlesData[0].img} />
						</CardMedia>
					</Card>
				))}
			</div>
		)
	}
};

export default PicturesPanel;

{/*<Paper zDepth={2}>*/
}
{/*<div className="root-grid-list">*/
}
{/*<Subheader>December</Subheader>*/
}
{/*<GridList*/
}
{/*cols={2}*/
}
{/*className="grid-list"*/
}
{/*>*/
}
{/*{titlesData.map((tile) => (*/
}
{/*<GridTile*/
}
{/*key={tile.img}*/
}
{/*title={tile.title}*/
}
{/*actionIcon={<IconButton><StarBorder color="white" /></IconButton>}*/
}
{/*actionPosition="left"*/
}
{/*titlePosition="top"*/
}
{/*titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"*/
}
{/*className="grid-tile"*/
}
{/*>*/
}
{/*<img src={tile.img} />*/
}
{/*</GridTile>*/
}
{/*))}*/
}
{/*</GridList>*/
}
{/*</div>*/
}
{/*</Paper>*/
}