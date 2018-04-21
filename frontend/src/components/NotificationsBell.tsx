import * as React from "react";
import Badge from "material-ui/Badge";
import Popover from "material-ui/Popover";
import FontIcon from "material-ui/FontIcon";
import { List, ListItem } from "material-ui/List";
import Avatar from "material-ui/Avatar";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { socket } from "../Index";
import { connect } from "react-redux";
import { markAllReadNotifications } from "../actions/NotificationsBell";
import { sendNotificationDispatch } from "../actions/Notifications";
import Menu from "material-ui/Menu";

class NotificationsBell extends React.Component<any, any> {
    public constructor(props) {
        super(props);
        this.state = {
            notificationsObj: { items: [] },
            open: false,
        };
    }

    public componentDidMount() {
        socket.on("notification", (data) => {
            let numberOfNotifications = "";
            const totalUnreads = data.totalUnreads;
            if (totalUnreads !== 0 && totalUnreads !== undefined) {
                numberOfNotifications = `(${totalUnreads})`;
            }
            document.title = `Ugram ${numberOfNotifications}`;
            this.setState({
                open: false,
            });
            data.items.sort((a, b) => {
                return b.createdDate - a.createdDate;
            });
            this.setState({
                notificationsObj: data,
            });
            if (this.state.notificationsObj.totalUnreads > 0) {
                sendNotificationDispatch("You have new notifications!", this.props.dispatch);
            }
        });
    }

    public render(): JSX.Element {
        const inlineBlockStyle = {
            display: "inline-block",
        };
        const notifListStyle = {
            maxHeight: "400px",
            width: "300px",
        };
        const notifItemListStyle = {
            width: "300px",
        };
        const imgStyle = {
            width: "50px",
            height: "45px",
        };

        let bell = null;
        if (this.state.notificationsObj.totalUnreads > 0) {
            bell = (
            <Badge
                className="no-padding"
                badgeContent={this.state.notificationsObj.totalUnreads}
                secondary={true}
                badgeStyle={{ fontSize: "9px", width: "15px", height: "15px", top: 0, right: 2 }}
            >
                <FontIcon onClick={this.handleClick} className="bell-navbar cursor-pointer material-icons">notifications</FontIcon>
            </Badge>
        );
        } else {
            bell = <FontIcon onClick={this.handleClick} className="bell-navbar cursor-pointer material-icons">notifications</FontIcon>;
        }

        return (
            <div style={inlineBlockStyle}>
                {bell}
                <Popover
                    className="tooltip-root"
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                    targetOrigin={{ horizontal: "left", vertical: "top" }}
                    onRequestClose={this.handleRequestClose}
                >
                    <List style={notifListStyle}>
                        {this.state.notificationsObj.items.map((notif) => {
                            let style = null;
                            let titleNotif = "";
                            const linkToPhoto = `/users/${window.localStorage.getItem("userId-06")}/`;
                            if (notif.type === "reaction") {
                                titleNotif = `${notif.authorId} liked your photo`;
                            } else {
                                titleNotif = `${notif.authorId} commented on your photo`;
                            }
                            if (!notif.read) {
                                style = {
                                    backgroundColor: "lightblue",
                                };
                            }
                            return (
                                // tslint:disable-next-line:jsx-key
                                <Link
                                    style={{ textDecoration: "none" }}
                                    onClick={this.handleRequestClose}
                                    to={linkToPhoto}
                                >
                                    <ListItem
                                        style={style}
                                        className="notifItemListStyle"
                                        leftAvatar={<Avatar src={notif.pictureUrlAuthor} />}
                                        secondaryText={(new Date(notif.createdDate)).toLocaleString()}
                                        primaryText={titleNotif}
                                        rightAvatar={<img style={imgStyle} src={notif.pictureUrl} />}
                                    />
                                </Link>
                            );
                        },
                    )}
                    </List>
                </Popover>
            </div>
            );
    }

    private handleClick = (event) => {
        event.preventDefault();

        this.setState({
            anchorEl: event.currentTarget,
            open: true,
        });
    }

    private handleRequestClose = () => {
        this.setState({
            open: false,
        });
        if (this.state.notificationsObj.totalUnreads > 0) {
            markAllReadNotifications(this.state.notificationsObj, window.localStorage.getItem("userId-06"), this.props.dispatch);
        }
    }
}

export default connect()(NotificationsBell);
