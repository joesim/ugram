import * as React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';

interface Props {
  editProfile: any,
  user: any
}

export default class DialogEdit extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      open: false,
      user: {
        email: this.props.user.email,
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName,
        phoneNumber: this.props.user.phoneNumber
      }
    }
  }  

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = () => {
    this.setState({ open: false });
    this.props.onSubmit(this.props.user.id, this.state.user);
  }

  handleChangeEmail = (event) => {
    const user = this.state.user;
    user.email=event.target.value;
    this.setState({
      user,
    });
  };

  handleChangeFirstName = (event) => {
    const user = this.state.user;
    user.firstName=event.target.value;
    this.setState({
      user,
    });
  };

  handleChangeLastName = (event) => {
    const user = this.state.user;
    user.lastName=event.target.value;
    this.setState({
      user,
    });
  };

  handleChangePhoneNumber = (event) => {
    const user = this.state.user;
    user.phoneNumber=event.target.value;
    this.setState({
      user,
    });
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
        onClick={this.handleSubmit}
      />,
    ];
    
    const styleDialog = {
      maxWidth: "600px"
    }    

    return (
      <div>
        <RaisedButton className="ma-10" labelPosition="before" label="Edit" icon={<FontIcon className="material-icons">edit</FontIcon>} onClick={this.handleOpen} />
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
            <div className="mb-15 itemLabel">
              First Name:
              </div>
            <div className="ml-15 mb-15 itemField">
            <TextField value={this.state.user.firstName} onChange={this.handleChangeFirstName}/>
              </div>
          </div>
          <div className="flex-row-nowrap flex-align-items-center">
            <div className="mb-15 itemLabel">
              Last name:
              </div>
            <div className="ml-15 mb-15 itemField">
            <TextField value={this.state.user.lastName} onChange={this.handleChangeLastName}/>
              </div>
          </div>
          <div className="flex-row-nowrap flex-align-items-center">
            <div className="mb-15 itemLabel">
              E-mail:
              </div>
            <div className="ml-15 mb-15 itemField">
            <TextField value={this.state.user.email} onChange={this.handleChangeEmail}/>
              </div>
          </div>
          <div className="flex-row-nowrap flex-align-items-center">
            <div className="mb-15 itemLabel">
              Phone:
              </div>
            <div className="ml-15 mb-15 itemField">
            <TextField value={this.state.user.phoneNumber} onChange={this.handleChangePhoneNumber}/>
              </div>
          </div>
        </Dialog>
      </div>
    );
  }
}