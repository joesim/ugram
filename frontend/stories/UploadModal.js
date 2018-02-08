import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Paper from 'material-ui/Paper';
import ImageAddAPhoto from 'material-ui/svg-icons/image/add-a-photo';
import IconButton from 'material-ui/IconButton';
import UploadButton2 from './UploadButton2';



const style = {
    height: 100,
    width: 100,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
  };

const iconStyles = {
    marginRight: 24,
};

const avatarStyles = {margin: 5};

export default class UploadModal extends Component {
    state = {
        open: false,
      };
    
      handleOpen = () => {
        this.setState({open: true});
      };
    
      handleClose = () => {
        this.setState({open: false});
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
            disabled={true}
            onClick={this.handleClose}
          />,
        ];
    
        return (
          <div>
          <MuiThemeProvider>
            <RaisedButton label="Modal Dialog" onClick={this.handleOpen} />
            <Dialog
              title="Upload an image"
              actions={actions}
              modal={true}
              open={this.state.open}
            >
              <IconButton>
                <ImageAddAPhoto />
              </IconButton>  
            </Dialog>
            </MuiThemeProvider>
          </div>
        );
      }
}

