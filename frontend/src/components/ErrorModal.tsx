import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import * as React from "react";

class ErrorModal extends React.Component<any, any> {
	public state = {
		open: false,
		toClose: false,
	};

	public constructor(props) {
		super(props);
	}

	public componentDidUpdate(prevProps, prevState): void {
		if (this.state.open && this.state.toClose === true) {
			this.setState({open: false, toClose: false});
		} else if (this.props.error === null && this.state.open === true) {
			this.setState({open: false});
		} else if (this.state.open === false && !prevState.toClose) {
			this.setState({open: true});
		}
	}

	public handleReload = (): void => {
		window.location.reload();
	}

	public handleConfirm = (): void => {
		this.setState({toClose: true});
	}

	public render() {
		let error = this.props.errorMessage;
		if (this.props.error && this.props.error.response && this.props.error.response.data.message) {
			error = this.props.error.response.data.message;
		}
		const actions: object = [
			(
			  <FlatButton
				  key={1}
				  label="Reload application"
				  secondary={true}
				  onClick={this.handleReload}
			  />
			),
			(
				<FlatButton
					key={1}
					label="Continue"
					primary={true}
					onClick={this.handleConfirm}
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
					{error}
				</Dialog>
		  </div>
		);
	}
}

export default ErrorModal;
