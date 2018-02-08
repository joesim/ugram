import React, { Component } from 'react';
import { action } from '@storybook/addon-actions';
 


export default class UploadButton extends Component {
    constructor(props) {
      super(props)
      
      this.state = {
        value: '',
        styles: {
          parent: {
            position: 'relative'
          },
          file: {
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: 0,
            width: '100%',
            zIndex: 1
          },
          text: {
            position: 'relative',
            zIndex: -1
          }
        }
      }
    }
  
    handleChange(e) {
      this.setState({
        value: e.target.value.split(/(\\|\/)/g).pop()
      })
  
      if (this.props.onChange) this.props.onChange(e)
    }
  
    render() {
      return (
        <div style={this.state.styles.parent}>
          <input
            type="file"
            name={this.props.name}
            className={this.props.className}
            onChange={this.handleChange.bind(this)}
            disabled={this.props.disabled}
            accept={this.props.accept}
            onClick={action('clicked hello')}
            style={this.state.styles.file} />
  
          <input
            type="text"
            tabIndex="-1"
            name={`this.props.name + '_filename'`}
            value={this.state.value}
            className={this.props.className}
            onChange={() => {console.log("hello")}}
            placeholder={this.props.placeholder}
            disabled={this.props.disabled}
            style={this.state.styles.text} />
        </div>
      )
    }
  }

