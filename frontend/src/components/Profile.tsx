import * as React from "react";
import Avatar from "material-ui/Avatar";
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';
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

const rowUsername: Object = {
    display: "flex",
    flexFlow: "row wrap",
}

const cardStyle: Object = {
    width: "100%",
    marginTop: "20px",
    height: "500px"
}

interface Props {
    user: any,
    hasErrored: boolean,
    isLoading: boolean,
    fetchData: any,
    editProfile: any
}

class Profile extends React.Component<Props, any> {
    public constructor(props) {
        super(props);
    }

	public componentWillMount() {
        console.log(this.props);
    }
    
    public render(){

        if (this.props.isLoading) {
            return (
                <div className="container mt-50">
                    <CircularProgress className="flex-justify-space" size={80} thickness={5} />
                </div>
            )
        }

        if (this.props.hasErrored) {
            return (
                <div className="container mt-50">
                    <p>
                        Sorry! There was an error loading your profile.
                    </p>
                </div>
            )
        }

        return (
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
                            <DialogEdit user={this.props.user} onSubmit={this.props.editProfile} />
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
        );
        
    }
}


export default Profile;
