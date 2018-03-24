import { Card, CardActions, CardHeader, CardMedia, CardText, CardTitle } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import * as React from "react";
import PicturesPanel from "../containers/PicturesPanel";
import Users from "../containers/Users";

interface Props {
    getSearchResults: (query: string) => any;
    query: string;
    searchResults: any;
    handler: any;
    match: any;
}

class SearchAll extends React.Component<Props, any> {
    public constructor(props) {
        super(props);
    }

    public handleUser = () => {
        this.props.handler("users");
    }

    public handleImages = () => {
        this.props.handler("images");
    }

    public handleHashtags = () => {
        this.props.handler("hashtags");
    }

    public componentDidMount() {
        this.props.getSearchResults(this.props.query);
    }

    public componentWillReceiveProps(nextProps) {
        if (this.props.query !== nextProps.query) {
            this.props.getSearchResults(nextProps.query);
        }
    }

    public render(): JSX.Element {
        let searchUsers = null;
        let searchPictures = null;
        let searchMentions = null;
        if (this.props.searchResults.users !== undefined && this.props.searchResults.users.items !== undefined) {
            searchUsers = <Users usersPassed={this.props.searchResults.users.items} />;
        }

        if (this.props.searchResults.pictures !== undefined && this.props.searchResults.pictures.items !== undefined) {
            searchPictures = <PicturesPanel picturesPassed={this.props.searchResults.pictures.items} />;
        }

        if (this.props.searchResults.mentions !== undefined && this.props.searchResults.mentions.items !== undefined) {
            searchMentions = <PicturesPanel picturesPassed={this.props.searchResults.mentions.items} />;
        }

        return (
            <div>
                <div className="mt-25">
                    <Card>
                        <CardHeader
                            title="Users"
                        />
                        {searchUsers}
                        <CardActions>
                            <FlatButton onClick={this.handleUser} label="See all" />
                        </CardActions>
                    </Card>
                </div>
                <div className="mt-25">
                    <Card>
                        <CardHeader
                            title="Pictures"
                        />
                        {searchPictures}
                        <CardActions>
                            <FlatButton onClick={this.handleImages} label="See all" />
                        </CardActions>
                    </Card>
                </div>
                <div className="mt-25">
                    <Card>
                        <CardHeader
                            title="Mentions"
                        />
                        {searchMentions}
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
