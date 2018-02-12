import Avatar from "material-ui/Avatar";
import List, { ListItem } from "material-ui/List";
import * as React from "react";
import { Link } from "react-router-dom";
import { User } from "../types/";
import ScrollLoader from "./ScrollLoader";

interface Props {
    getAllUsers: (page: number, perPage: number) => any;
    users: User[];
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
        this.props.getAllUsers(this.state.page, this.state.perPage);
    }

    public async scrollHandler(): Promise<any> {
        this.setState((prevState) => {
            return {page: prevState.page + 1};
        });

        await this.props.getAllUsers(this.state.page, this.state.perPage);
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
                <ScrollLoader scrollHandler={this.scrollHandler} />
            </div>
        );
    }
}

export default Users;
