import * as React from "react";
import { isUndefined } from "util";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import PictureDetails from "../containers/PictureDetails";

interface Props {
    pictures_panel: any;
    getAllPictures: any;
    userId: string;
    getAllPicturesFromUser: any;
}

class PicturesPanel extends React.Component<Props, any> {

    public constructor(props) {
        super(props);

        this.state = {
            loading: "hidden",
            open: false,
            page: 0,
            perPage: 20,
            pictureDetails: null,
            userId: null,
        };

        this.handleOnScroll = this.handleOnScroll.bind(this);
        this.getColumnPictures = this.getColumnPictures.bind(this);
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.props.pictures_panel.pictures = [];
    }

    public componentDidMount() {
        window.addEventListener("scroll", this.handleOnScroll);
    }

    public componentWillUnmount() {
        window.removeEventListener("scroll", this.handleOnScroll);
    }

    public render() {
        if (this.props.userId !== this.state.userId) {
            this.props.pictures_panel.pictures = [];
            this.setState({page: 0, userId: this.props.userId});
            if (isUndefined(this.props.userId)) {
                this.props.getAllPictures(0, this.state.perPage)
            } else {
                this.props.getAllPicturesFromUser(0, this.state.perPage, this.props.userId)
            }
        }

        let pictures = [];

        this.props.pictures_panel.pictures.forEach((pic, index) => {
            pictures.push({
                author: pic.userId,
                createdDate: new Date(pic.createdDate),
                img: pic.url,
            });
        });

        pictures = this.filterByDate(pictures);

        const col1 = this.getColumnPictures(pictures, 0, 3);
        const col2 = this.getColumnPictures(pictures, 1, 3);
        const col3 = this.getColumnPictures(pictures, 2, 3);

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

    private closeDialog() {
        this.setState({open: false});
    }

    private openDialog(indexPicture) {
        this.setState({open: true, pictureDetails: this.props.pictures_panel.pictures[indexPicture]});
    }

    private filterByDate(pictures) {
        pictures.sort((a, b) => {
            return b.createdDate - a.createdDate;
        });

        return pictures;
    }

    private handleOnScroll() {
        const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
        const clientHeight = document.documentElement.clientHeight || window.innerHeight;
        const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

        if (scrolledToBottom && this.props.userId === this.state.userId) {
            this.setState((prevState) => {
                return {page: prevState.page + 1};
            });

            if (isUndefined(this.props.userId)) {
                this.props.getAllPictures(this.state.page, this.state.perPage);
            } else {
                this.props.getAllPicturesFromUser(this.state.page, this.state.perPage, this.props.userId);
            }
            this.setState({loading: ""});

            setTimeout(() => {
                this.setState({loading: "hidden"});
            }, 2500);
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
            );
        }

        return column;
    }
}

export default PicturesPanel;
