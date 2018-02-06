import * as React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

class Signup extends React.Component<any,any> {
	public constructor(props) {
		super(props);
		console.log(this.props);

		// this.props.signupUser(formData);
		this.state = {
			firstname: ""
		}
		this.createUser = this.createUser.bind(this);
	}

	private createUser() {
		const formData = new FormData();

		formData.append("firstName", document.getElementById("firstname")["value"]);
		formData.append("lastName", document.getElementById("lastname")["value"]);
		formData.append("email", document.getElementById("email")["value"]);
		formData.append("phoneNumber", document.getElementById("number")["value"]);
		formData.append("id", document.getElementById("id")["value"]);

		this.props.signupUser(formData);
	}

	public render() {
		if (this.props.signup.tokenUrl !== "") {
			window.localStorage.setItem("token-06", this.props.signup.tokenUrl.split("token=")[1])
			document.location.href = "/";
		}
		return (
			<div className="signup">
				<TextField id="firstname" hintText="Firstname" />
				<TextField id="lastname" hintText="Lastname" />
				<TextField id="email" hintText="Email" />
				<TextField id="number" hintText="5555555555" />
				<TextField id="id" hintText="id" />
				<RaisedButton label="Create User" onClick={this.createUser} primary={true} />
			</div>
		)
	}
}

export default Signup;