import * as React from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class ErrorModal extends React.Component<any, any> {
  state = {
    open: false,
	};
	
	public constructor(props) {
		super(props);
	}

	public componentDidUpdate(prevProps, prevState) : void {
		if (this.props.error === null && this.state.open === true) {
			this.setState({open: false});
		} else if (this.state.open === false) {
			this.setState({open: true});
		}
	} 

	handleButton = () : void => {
		window.location.reload();
	};

	render() {
		const actions : object = [
		  <FlatButton
			label="Reload application"
			primary={true}
			onClick={this.handleButton}
		  />,
		];
	
		return (
		  <div>
				<Dialog
					title="An error occured"
					actions={actions}
					modal={true}
					open={this.state.open}
				>
					{this.props.errorMessage}
				</Dialog>
		  </div>
		);
	}
}

export default ErrorModal;