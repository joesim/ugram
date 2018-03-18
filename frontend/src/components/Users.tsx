import Avatar from "material-ui/Avatar";
import List, { ListItem } from "material-ui/List";
import * as React from "react";
import { Link } from "react-router-dom";
import { User } from "../types/";
import ScrollLoader from "./ScrollLoader";

interface Props {
    getAllUsers: (page: number, perPage: number) => any;
    getAllUsersFiltered: (query: string, page: number, perPage: number) => any;
    receivingNewUsers: () => any;
    query: string;
    users: User[];
    usersPassed: any;
}

class Users extends React.Component<Props, any> {
    public constructor(props) {
        super(props);

        this.state = {
            page: 0,
            perPage: 20,
        };

        this.scrollHandler = this.scrollHandler.bind(this);
    }

    public componentDidMount(): void {
        this.props.receivingNewUsers();
        if (this.props.usersPassed === undefined) {
            if (this.props.query !== undefined) {
                this.props.getAllUsersFiltered(this.props.query, this.state.page, this.state.perPage);
            } else {
                this.props.getAllUsers(this.state.page, this.state.perPage);
            }
        }
    }

    public async scrollHandler(): Promise<any> {
        this.setState((prevState) => {
            return { page: prevState.page + 1 };
        });
        if (this.props.usersPassed === undefined) {
            if (this.props.query !== undefined) {
                this.props.getAllUsersFiltered(this.props.query, this.state.page, this.state.perPage);
            } else {
                this.props.getAllUsers(this.state.page, this.state.perPage);
            }
        }
    }

    public render(): JSX.Element {
        console.log(this.props.usersPassed)
        if (this.props.usersPassed !== undefined && this.props.usersPassed.length>0) {
            return (
                <List>
                    {this.props.usersPassed.map((user) =>
                        <Link key={user.id} className="list-link-style-override" to={`/users/${user.id}`}>
                            <ListItem
                                primaryText={`${user.firstName} ${user.lastName}`}
                                leftAvatar={<Avatar src={user.pictureUrl} />}
                            />
                        </Link>,
                    )}
                </List>
            );
        } else if (this.props.users !== undefined && this.props.users.length>0) {
            console.log("here");
            return (
                <div className="container">
                    <List>
                        {this.props.users.map((user) =>
                            <Link key={user.id} className="list-link-style-override" to={`/users/${user.id}`}>
                                <ListItem
                                    primaryText={`${user.firstName} ${user.lastName}`}
                                    leftAvatar={<Avatar src={user.pictureUrl} />}
                                />
                            </Link>,
                        )}
                    </List>
                    <ScrollLoader scrollHandler={this.scrollHandler} />
                </div>
            );
        } else {
            return <div className="ma-20">No results</div>
        }
    }
}


export default Users;
