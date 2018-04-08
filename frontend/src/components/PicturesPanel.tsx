import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import * as React from "react";
import { isUndefined } from "util";
import PictureDetails from "../containers/PictureDetails";
import ScrollLoader from "./ScrollLoader";

interface Props {
    pictures_panel: any;
    picturesPassed: any;
    getAllPictures: any;
    userId: string;
    getAllPicturesFromUser: any;
    query: string;
    category: string;
    getAllPicturesFilteredDesc: any;
    getAllPicturesFilteredHashtags: any;
}

class PicturesPanel extends React.Component<Props, any> {

    public constructor(props) {
        super(props);
        this.state = {
            open: false,
            page: 0,
            perPage: 20,
            pictureDetails: null,
            userId: null,
        };
        this.props.pictures_panel.pictures = [];

        this.getColumnPictures = this.getColumnPictures.bind(this);
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.scrollHandler = this.scrollHandler.bind(this);
    }

    public async scrollHandler() {
        if (this.props.userId === this.state.userId) {
            this.setState((prevState) => {
                return { page: prevState.page + 1 };
            });
            if (isUndefined(this.props.userId)) {
                if (this.props.query === undefined) {
                    await this.props.getAllPictures(this.state.page, this.state.perPage);
                }
            } else {
                await this.props.getAllPicturesFromUser(this.state.page, this.state.perPage, this.props.userId);
            }
        }
    }

    public componentDidMount() {
        if (this.props.picturesPassed === undefined && this.props.userId !== this.state.userId) {
            this.props.pictures_panel.pictures = [];
            this.setState({ page: 0, userId: this.props.userId });
            if (isUndefined(this.props.userId)) {
                if (this.props.query === undefined) {
                    this.props.getAllPictures(this.state.page, this.state.perPage);
                } else if (this.props.category === "description") {
                    this.props.getAllPicturesFilteredDesc(this.props.query, this.state.page, this.state.perPage);
                } else if (this.props.category === "hashtags") {
                    this.props.getAllPicturesFilteredHashtags(this.props.query, this.state.page, this.state.perPage);
                }
            } else {
                this.props.getAllPicturesFromUser(this.state.page, this.state.perPage, this.props.userId);
            }
        }
    }

    public componentWillReceiveProps(nextProps) {
        if (this.props.query !== nextProps.query) {
            if (nextProps.picturesPassed === undefined) {
                nextProps.pictures_panel.pictures = [];
                this.setState({ page: 0, userId: nextProps.userId });
                if (isUndefined(nextProps.userId)) {
                    if (nextProps.query === undefined) {
                        nextProps.getAllPictures(this.state.page, this.state.perPage);
                    } else if (nextProps.category === "description") {
                        nextProps.getAllPicturesFilteredDesc(nextProps.query, this.state.page, this.state.perPage);
                    } else if (nextProps.category === "hashtags") {
                        nextProps.getAllPicturesFilteredHashtags(nextProps.query, this.state.page, this.state.perPage);
                    }
                } else {
                    nextProps.getAllPicturesFromUser(this.state.page, this.state.perPage, nextProps.userId);
                }
            }
        }
    }

    public render() {

        let pictures = [];

        if (this.props.picturesPassed === undefined) {
            this.props.pictures_panel.pictures.forEach((pic, index) => {
                pictures.push({
                    author: pic.userId,
                    createdDate: new Date(pic.createdDate),
                    img: pic.url_t,
                });
            });
        } else {
            this.props.picturesPassed.forEach((pic, index) => {
                pictures.push({
                    author: pic.userId,
                    createdDate: new Date(pic.createdDate),
                    img: pic.url,
                });
            });
        }

        if (pictures.length === 0) {
            return <div className="ma-20">No results</div>;
        }

        pictures = this.filterByDate(pictures);

        const col1 = this.getColumnPictures(pictures, 0, 3);
        const col2 = this.getColumnPictures(pictures, 1, 3);
        const col3 = this.getColumnPictures(pictures, 2, 3);

	       let scrollhandler = null;
        if (this.props.picturesPassed === undefined) {
            scrollhandler = <ScrollLoader scrollHandler={this.scrollHandler} />;
        }

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
                {scrollhandler}
                <PictureDetails
                    open={this.state.open}
                    closeDialog={this.closeDialog}
                    picture={this.state.pictureDetails}
                />
            </div>
        );
    }

    private closeDialog() {
        this.setState({ open: false });
    }

    private openDialog(indexPicture) {
        if (this.props.picturesPassed === undefined) {
            this.setState({ open: true, pictureDetails: this.filterByDate(this.props.pictures_panel.pictures)[indexPicture] });
        } else {
            this.setState({ open: true, pictureDetails: this.filterByDate(this.props.picturesPassed)[indexPicture] });
        }
    }

    private filterByDate(pictures) {
        pictures.sort((a, b) => {
            return b.createdDate - a.createdDate;
        });

        return pictures;
    }

    private handleImgError(error) {
        error.target.remove();
    }

    private getColumnPictures(pictures, startInd, step) {
        const column = [];

        for (let i = startInd; i < pictures.length; i += step) {
            column.push(
                <a onClick={() => { this.openDialog(i); }} >
                    <img className="picture" src={pictures[i].img} onError={this.handleImgError} style={{ width: "100%" }} />
                </a>,
            );
        }

        return column;
    }
}

export default PicturesPanel;
