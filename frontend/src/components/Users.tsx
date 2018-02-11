import Avatar from "material-ui/Avatar";
import List, { ListItem } from "material-ui/List";
import * as React from "react";
import { Link } from "react-router-dom";
import { User } from "../types/";

interface Props {
    getAllUsers: () => any;
    users: User[];
}

class Users extends React.Component<Props, any> {
    public constructor(props) {
        super(props);
    }

    public componentDidMount(): void {
        this.props.getAllUsers();
    }

    public render(): JSX.Element {
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
            </div>
        );
    }
}

export default Users;
