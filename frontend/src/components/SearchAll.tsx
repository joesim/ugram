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
    match:any;
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

    public componentWillReceiveProps(nextProps){
        if (this.props.query !== nextProps.query){
            this.props.getSearchResults(nextProps.query);
        }
    }

    public render(): JSX.Element {
        console.log(this.props);
        let searchUsers = null;
        let searchPictures = null;
        let searchMentions = null;
        if (this.props.searchResults.users!==undefined){
            searchUsers = <Users usersPassed={this.props.searchResults.users.items} />
        }

        if (this.props.searchResults.pictures!==undefined && this.props.searchResults.pictures.items!==undefined){
            searchPictures = <PicturesPanel picturesPassed={this.props.searchResults.pictures.items} />
        }

        if (this.props.searchResults.mentions!==undefined && this.props.searchResults.mentions.items!==undefined){
            searchMentions = <PicturesPanel picturesPassed={this.props.searchResults.mentions.items} />
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
                            title="Images"
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
                            title="Hashtags"
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
