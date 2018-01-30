import * as React from "react";
import Avatar from "material-ui/Avatar";
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

const avatarStyle = {
    width: "200px",
    height: "200px"
}

const rowUser: Object = {
    justifyContent: "space-around",
    display: "flex",
    alignItems: "center",
    flexFlow: "row wrap",
}

const avatarItem: Object = {
    padding: "20px"
}

const infoItem: Object = {
    padding: "20px"
}

const rowUsername: Object = {
    display: "flex",
    flexFlow: "row wrap",
}

const Profile = () => {
    return (
        <div className="container mt-25">
            <div style={rowUser}>
                <div style={avatarItem}>
                    <Avatar className="text-xs-center" style={avatarStyle} src="https://memegenerator.net/img/images/600x600/1137321/xzibit-yo-dawg.jpg" />
                </div>
                <div style={infoItem}>
                    <div style={rowUser}>
                        <h4>Xzibit Xzibot</h4>
                        <p className="ma-20">@xzibit</p>
                        <RaisedButton labelPosition="before" label="Edit" primary={true} icon={<FontIcon className="material-icons">edit</FontIcon>}></RaisedButton>
                    </div>
                </div>
            </div>
        </div>
    )
};

export { Profile };
