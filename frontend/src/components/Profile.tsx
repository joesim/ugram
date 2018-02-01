import * as React from "react";
import Avatar from "material-ui/Avatar";
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import LinearProgress from 'material-ui/LinearProgress';
import DialogEdit from './DialogEdit';

const avatarStyle: Object = {
    width: "150px",
    height: "150px"
}

const rowUser: Object = {
    justifyContent: "space-around",
    display: "flex",
    alignItems: "center",
    flexFlow: "row wrap",
}

const rowNoSpace: Object = {
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    flexFlow: "row wrap",
}

const rowNoWrap: Object = {
    justifyContent: "space-around",
    display: "flex",
    alignItems: "center",
    flexFlow: "row nowrap",
}

const infoItem: Object = {
    padding: "10px",
    alignSelf: "flex-start"
}

const cardStyle: Object = {
    width: "100%",
    marginTop: "20px",
    height: "500px"
}

const styleLoading: Object = {
    position: "fixed",
    top: "0",
    left: "0",
    backgroundColor: "rgba(189, 189, 189, 0)",
    zIndex: "10000",
    width: "100%",
}

interface Props {
    user: any,
    error: any,
    isLoading: boolean,
    fetchData: any,
    editProfile: any,
    match: any
}

class Profile extends React.Component<Props, any> {
    public constructor(props) {
        super(props);
    }

    public componentDidMount() {
        console.log(this.props.user != {});
        this.props.fetchData(this.props.match.params.id)
    }

    public render() {

        let loadingBar = null;
        if (this.props.isLoading) {
            loadingBar =
                <LinearProgress color="black" style={styleLoading} mode="indeterminate" />;

        }
        let editButton = null;
        if (!this.props.isLoading) {
            editButton = <DialogEdit user={this.props.user} onSubmit={this.props.editProfile} />;
        }

        if (this.props.error.hasErrored) {
            return (
                <div className="container mt-50">
                    <p>
                        {this.props.error.errorMessage}
                    </p>
                </div>
            )
        }

        return (
            <div>
                {loadingBar}
                <div className="container mt-25">
                    <div className="flex-container">
                        <div style={rowUser}>
                            <div>
                                <Avatar className="ml-30 mr-30" style={avatarStyle} src={this.props.user.pictureUrl} />
                            </div>
                            <div style={infoItem}>
                                <div style={rowNoSpace} className="mb-10">
                                    <div className="h4 font-weight-bold">{this.props.user.firstName} {this.props.user.lastName}</div>
                                    <p className="ml-10 mr-30">@{this.props.user.id}</p>
                                    {editButton}
                                </div>
                                <div style={rowUser}>
                                    <div style={rowNoWrap} className="ml-30 mr-30">
                                        <FontIcon className="material-icons mr-10 ml-10">email</FontIcon>
                                        <div>
                                            {this.props.user.email}
                                        </div>
                                    </div>
                                    <div style={rowNoWrap}>
                                        <FontIcon className="material-icons mr-10 ml-10">phone</FontIcon>
                                        <div>
                                            {this.props.user.phoneNumber}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={rowUser}>
                        <Card style={cardStyle}>
                            <CardText>
                                Images here
                        </CardText>
                        </Card>
                    </div>
                </div>
            </div>
        );

    }
}


export default Profile;
