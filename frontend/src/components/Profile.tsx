import Avatar from "material-ui/Avatar";
import { Card, CardActions, CardHeader, CardText } from "material-ui/Card";
import CircularProgress from "material-ui/CircularProgress";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import FontIcon from "material-ui/FontIcon";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import * as React from "react";
import { Redirect } from "react-router-dom";
import PicturesPanel from "../containers/PicturesPanel";
import DialogEdit from "./DialogEdit";

interface Props {
    user: {
        firstName: string,
        lastName: string,
        id: string,
        pictureUrl: string,
        phoneNumber: string,
        email: string,
    };
    error: any;
    fetchData: any;
    editProfile: any;
    removeProfile: any;
    match: any;
    socket: any;
}

class Profile extends React.Component<Props, any> {
    public constructor(props) {
        super(props);
        this.state = {
            accountDeleted: false,
            open: false,
            openSnackbar: false,
        };
    }

    public componentDidMount() {
        this.props.fetchData(this.props.match.params.id);
    }

    public componentWillReceiveProps(nextProps) {
        if (this.props.match.params.id !== nextProps.match.params.id) {
            this.props.fetchData(nextProps.match.params.id);
        }
    }

    public handleOpen = () => {
        this.setState({ open: true });
    }

    public handleClose = () => {
        this.setState({ open: false });
    }

    public handleSubmit = () => {
        this.setState({ open: false, accountDeleted: true, openSnackbar: true });
        this.props.removeProfile(this.props.user.id);
    }

    public handleRequestClose = () => {
        this.setState({
            openSnackbar: false,
        });
    }

    public render() {

        if (this.state.accountDeleted) {
            return <Redirect to={"/"} push={true}/>;
        }

        const actions = [
            (
                <FlatButton
                    key={1}
                    label="No"
                    primary={true}
                    onClick={this.handleClose}
                />
            ),
            (
                <FlatButton
                    key={2}
                    label="Yes"
                    primary={true}
                    onClick={this.handleSubmit}
                />
            ),
        ];
        let editButton = null;
        let deleteButton = null;
        let avatar = null;
        if (window.localStorage.getItem("userId-06") === this.props.user.id) {
            editButton = <DialogEdit user={this.props.user} onSubmit={this.props.editProfile} />;
            deleteButton = <RaisedButton secondary={true} className="ma-10" labelPosition="before" label="Delete" onClick={this.handleOpen} icon={<FontIcon className="material-icons">delete_forever</FontIcon>} />;
        }

        if (this.props.user.pictureUrl != null) {
            avatar = <Avatar className="ml-15 mr-15 avatarStyle" src={this.props.user.pictureUrl} />;
        } else if (this.props.user.email !== undefined) {
            avatar = <Avatar className="ml-15 mr-15 avatarStyle" src="../../assets/nopic.jpg" />;
        }

        if (this.props.match.params.id === this.props.user.id) {
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
                                    {deleteButton}
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
                            <PicturesPanel userId={this.props.user.id} />
                        </Card>
                    </div>
                    <Dialog
                        title="Profile deletion"
                        actions={actions}
                        modal={true}
                        autoScrollBodyContent={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}
                    >

                        <div>
                            Are you sure you want to delete your account permanently?
                        </div>
                    </Dialog>
                </div>
            );
        } else {
            return null;
        }

    }
}

export default Profile;
