import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import * as React from "react";

class ErrorModal extends React.Component<any, any> {
  public state = {
    open: false,
	};

	public constructor(props) {
		super(props);
	}

	public componentDidUpdate(prevProps, prevState): void {
		if (this.props.error === null && this.state.open === true) {
			this.setState({open: false});
		} else if (this.state.open === false) {
			this.setState({open: true});
		}
	}

	public handleButton = (): void => {
		window.location.reload();
	}

	public render() {
		const actions: object = [
			(
			  <FlatButton
				  key={1}
				  label="Reload application"
				  primary={true}
				  onClick={this.handleButton}
			  />
			),
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
