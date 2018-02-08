import * as React from "react";
import Avatar from "material-ui/Avatar";
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import DialogEdit from './DialogEdit';
import CircularProgress from 'material-ui/CircularProgress';

interface Props {
    user: any,
    error: any,
    fetchData: any,
    editProfile: any,
    match: any
}

class Profile extends React.Component<Props, any> {
    public constructor(props) {
        super(props);
    }

    public componentDidMount() {
        this.props.fetchData(this.props.match.params.id)
    }

    public render() {

        let editButton = null;
        if (window.localStorage.getItem("userId-06")==this.props.user.id) {
            editButton = <DialogEdit user={this.props.user} onSubmit={this.props.editProfile} />
        }

        let avatar = null;
        if (this.props.user.pictureUrl != null) {
            avatar = <Avatar className="ml-15 mr-15 avatarStyle" src={this.props.user.pictureUrl} />
        } else if (this.props.user.email != undefined) {
            avatar = <Avatar className="ml-15 mr-15 avatarStyle" src="../../assets/nopic.jpg" />
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
            <div className="container mt-25">
                <div className="flex-container">
                    <div className="rowUser">
                        <div className="infoItem">
                            <div className="rowNoSpace mb-5">
                                <div className="mr-30 ml-30 flex-justify-center flex-row-wrap flex-align-items-center">
                                        {avatar}
                                        <div className="h4 font-weight-bold">{this.props.user.firstName} {this.props.user.lastName}</div>
                                    <div className="ml-10">@{this.props.user.id}</div>
                                </div>
                                {editButton}
                            </div>
                            <div className="rowNoSpace">
                                <div className="rowNoWrap ml-25 mr-15">
                                    <FontIcon className="material-icons mr-10 ml-10">email</FontIcon>
                                    <div>
                                        {this.props.user.email}
                                    </div>
                                </div>
                                <div className="rowNoWrap ml-15 mr-25">
                                    <FontIcon className="material-icons mr-10 ml-10">phone</FontIcon>
                                    <div>
                                        {this.props.user.phoneNumber}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rowUser">
                    <Card className="cardStyle">
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
