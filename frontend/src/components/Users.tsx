import * as React from "react";
import Avatar from 'material-ui/Avatar';
import List, { ListItem } from 'material-ui/List';
import { Link } from "react-router-dom";

interface Props {
	getAllUsers: any,
	users: any,
}

class Users extends React.Component<Props, any> {
	public constructor(props) {
		super(props);
    }

    public componentDidMount() : void {
        this.props.getAllUsers();
    }
    
    public render() : JSX.Element {
        return (
            <List>
                {this.props.users.map((user) => 
                    <Link className="list-link-style-override" to={`/users/${user.id}`}>
                        <ListItem 
                        key={user.id} 
                        primaryText={`${user.firstName} ${user.lastName}`}
                        leftAvatar={<Avatar src={user.pictureUrl} />} 
                        />
                    </Link>
                )}
            </List>
        );
    }
}

export default Users;