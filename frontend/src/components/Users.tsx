import * as React from "react";
import Avatar from 'material-ui/Avatar';
import List, { ListItem } from 'material-ui/List';

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
                    <ListItem 
                    key={user.id} 
                    primaryText={user.firstName + " " + user.lastName}
                    leftAvatar={<Avatar src={user.pictureUrl} />} 
                    />
                )}
            </List>
        );
    }
}

export default Users;