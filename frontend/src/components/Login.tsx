import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import * as React from "react";
import { setDefaultsFromLocalStorage } from "../axios";

class Login extends React.Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {
        	username: "",
        };
	    this.login = this.login.bind(this);
	    console.log(this.props)
    }

	public componentDidUpdate(prevProps, prevState): void {
    	console.log(this.props)
		if (this.props.login.tokenUrl !== "") {
			window.localStorage.setItem("token-06", this.props.login.tokenUrl);
			window.localStorage.setItem("userId-06", this.state.username);
			setDefaultsFromLocalStorage();

			document.location.href = "/";
		}
	}

	private login(event) {
	    event.preventDefault();
        const data = {
    		password: event.target[1].value,
		    username: event.target[0].value,
        };
        this.setState({username: data.username});
        this.props.loginUser(data);
	}

    public render() {
        return (
            <div>
                <form onSubmit={this.login} className="login">
	                <TextField id="username" required={false} type="text" floatingLabelText="Username"/>
	                <TextField id="password" required={false} type="password" floatingLabelText="*******"/>
                    <RaisedButton label="Login" type="submit" primary={true} />
                    <RaisedButton label="Login with Google" href="http://localhost:3000/auth/google" primary={true} />
                    <RaisedButton href="/#/signup" label="Signup" primary={true} />
                </form>
                {/*<a href="http://localhost:3000/auth/google">Google</a>*/}
                {/*<form onSubmit={this.createUser} className="signup">*/}
                    {/*<TextField id="firstname" required={false} type="text" floatingLabelText="First Name"/>*/}
                    {/*<TextField id="lastname" required={false} type="text" floatingLabelText="Last Name"/>*/}
                    {/*<TextField id="number" required={false} type="tel" hintText="Phone Number" floatingLabelText="format: 5555555555" />*/}
                    {/*<TextField id="id" required={false} type="text" floatingLabelText="id" />*/}
                    {/*<TextField id="email" required={true} type="email" floatingLabelText="Email" />*/}
                    {/*<TextField id="password" required={true} type="password" floatingLabelText="Password" />*/}
                    {/*<RaisedButton label="Create User" type="submit" primary={true} />*/}
                    {/*<RaisedButton label="Login" onClick={this.loginUser} primary={true} />*/}
                {/*</form>*/}
            </div>
        );
    }
}

export default Login;
