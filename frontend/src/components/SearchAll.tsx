import * as React from "react";
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class SearchAll extends React.Component<any, any> {
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

    public render(): JSX.Element {
        return (
            <div>
                <div className="mt-25">
                    <Card>
                        <CardHeader
                            title="Users"
                        />
                        <div>
                            3 users
                        </div>
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
                        <div>
                            3 images
                        </div>
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
                        <div>
                            3 hashtags
                        </div>
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
