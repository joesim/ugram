import * as React from "react";
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Users from "../containers/Users";
import PicturesPanel from "../containers/PicturesPanel";

interface Props {
    getSearchResults: (query: string) => any;
    query: string;
    searchResults: any;
    handler: any;
}

class SearchAll extends React.Component<Props, any> {
    public constructor(props) {
        super(props);
    }

    handleUser = () => {
        this.props.handler("users")
    }

    handleImages = () => {
        this.props.handler("images")
    }

    handleHashtags = () => {
        this.props.handler("hashtags")
    }

    public componentDidMount() {
        this.props.getSearchResults(this.props.query);
    }

    public render(): JSX.Element {

        if (this.props.searchResults.users === undefined){
            return null;
        }

        return (
            <div>
                <div className="mt-25">
                    <Card>
                        <CardHeader
                            title="Users"
                        />
                        <Users usersPassed={this.props.searchResults.users} />
                        <CardActions>
                            <FlatButton onClick={this.handleUser} label="See all" />
                        </CardActions>
                    </Card>
                </div>
                <div className="mt-25">
                    <Card>
                        <CardHeader
                            title="Images"
                        />
                        <PicturesPanel picturesPassed={this.props.searchResults.pictures} />
                        <CardActions>
                            <FlatButton onClick={this.handleImages} label="See all" />
                        </CardActions>
                    </Card>
                </div>
                <div className="mt-25">
                    <Card>
                        <CardHeader
                            title="Hashtags"
                        />
                        <PicturesPanel picturesPassed={this.props.searchResults.hashtags} />
                        <CardActions>
                            <FlatButton onClick={this.handleHashtags} label="See all" />
                        </CardActions>
                    </Card>
                </div>
            </div>
        );
    }
}

export default SearchAll;
