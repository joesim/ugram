import React, { Component } from 'react';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import styles from './Input.css.js';


export default class UploadButton2 extends Component {
    constructor(props)
    {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        console.log(styles.button)
    }
    handleChange(selectorFiles)
    {
        console.log(selectorFiles);
    }
    render ()
    {
        return <div>
        <MuiThemeProvider>
            <input type="file" onChange={ (e) => this.handleChange(e.target.files) } />
        </MuiThemeProvider>
        </div>;
    }
}