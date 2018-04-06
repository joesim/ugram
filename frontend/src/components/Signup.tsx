import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import * as React from "react";
import { setDefaultsFromLocalStorage } from "../axios";
import Login from "./Login";

class Signup extends React.Component<any, any> {
    public constructor(props) {
        super(props);

        this.state = {
	        email: "",
	        password: "",
            userId: "",
        };
        this.createUser = this.createUser.bind(this);
    }

    public render() {
        return (
            <div>
                <form onSubmit={this.createUser} className="signup">
                    <TextField id="firstname" required={true} type="text" floatingLabelText="First Name"/>
                    <TextField id="lastname" required={true} type="text" floatingLabelText="Last Name"/>
                    <TextField id="number" required={true} type="tel" hintText="Phone Number" floatingLabelText="format: 5555555555" />
                    <TextField id="id" required={true} type="text" floatingLabelText="id" />
                    <TextField id="email" required={true} type="email" floatingLabelText="Email" />
                    <TextField id="password" required={true} type="password" floatingLabelText="Password" />
                    <RaisedButton label="Create User" type="submit" primary={true} />
                </form>
            </div>
        );
    }

    private createUser(event) {
        event.preventDefault();
        const data = {
            email:  event.target[4].value,
            firstName: event.target[0].value,
            id: event.target[3].value,
    	    lastName: event.target[1].value,
            password: event.target[5].value,
	        phoneNumber: event.target[2].value,
        };
        this.setState({ userId: event.target[2].value});
        this.setState({ password: event.target[5].value});

        this.props.signupUser(data);
    }
}

export default Signup;
