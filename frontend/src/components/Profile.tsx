import * as React from "react";
import Avatar from "material-ui/Avatar";
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

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

class Profile extends React.Component {
    public render(){
        return (
            <div className="container mt-25">
            <div className="flex-container">
                <div style={rowUser}>
                    <div>
                        <Avatar className="ml-30 mr-30" style={avatarStyle} src="https://memegenerator.net/img/images/600x600/1137321/xzibit-yo-dawg.jpg" />
                    </div>
                    <div style={infoItem}>
                        <div style={rowNoSpace} className="mb-10">
                            <div className="h4 font-weight-bold">Lorem Ipsum</div>
                            <p className="ml-10 mr-30">@xzibit</p>
                            <RaisedButton labelPosition="before" label="Edit" primary={true} icon={<FontIcon className="material-icons">edit</FontIcon>}></RaisedButton>
                        </div>
                        <div style={rowUser}>
                            <div style={rowNoWrap} className="ml-30 mr-30">
                                <FontIcon className="material-icons mr-10 ml-10">email</FontIcon>
                                <div>
                                    xzibit@hotmail.com
                                </div>
                            </div>
                            <div style={rowNoWrap}>
                                <FontIcon className="material-icons mr-10 ml-10">phone</FontIcon>
                                <div>
                                    +1 (418) 123-4567
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


export { Profile };
