import * as React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';

const styleDialog = {
  maxWidth: "600px"
}

const itemLabel = {
  textAlign: "right",
  flex: "1 0 15%",
  boxSizing: "border-box",
}

const itemField = {
  flex: "1 0 50%",
  boxSizing: "border-box",
}

export default class DialogEdit extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      open: false
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <div>
        <RaisedButton labelPosition="before" label="Edit" secondary={true} icon={<FontIcon className="material-icons">edit</FontIcon>} onClick={this.handleOpen} />
        <Dialog
          title="Edit Profile"
          actions={actions}
          modal={true}
          autoScrollBodyContent={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          contentStyle={styleDialog}
        >

          <div className="flex-row-nowrap flex-align-items-center">
            <div className="mb-15" style={itemLabel}>
              First Name:
              </div>
            <div className="ml-15 mb-15" style={itemField}>
            <TextField hintText={this.props.firstname}/>
              </div>
          </div>
          <div className="flex-row-nowrap flex-align-items-center">
            <div className="mb-15" style={itemLabel}>
              Last name:
              </div>
            <div className="ml-15 mb-15" style={itemField}>
            <TextField hintText={this.props.lastname}/>
              </div>
          </div>
          <div className="flex-row-nowrap flex-align-items-center">
            <div className="mb-15" style={itemLabel}>
              E-mail:
              </div>
            <div className="ml-15 mb-15" style={itemField}>
            <TextField hintText={this.props.email}/>
              </div>
          </div>

        </Dialog>
      </div>
    );
  }
}