import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import * as React from "react";
import { setDefaultsFromLocalStorage } from "../axios";
import { API_URL } from "../constants";

class Login extends React.Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {
        	username: "",
        };
	       this.login = this.login.bind(this);
    }

	public componentDidUpdate(prevProps, prevState): void {
		if (this.props.login.tokenUrl !== "") {
			window.localStorage.setItem("token-06", this.props.login.tokenUrl);
			window.localStorage.setItem("userId-06", this.state.username);
			setDefaultsFromLocalStorage();

			document.location.href = "/";
		}
	}
    public render() {
        return (
            <div id="loginPage">
                <form onSubmit={this.login} className="loginForm">
	                <TextField id="username" required={false} type="text" floatingLabelText="Username"/>
	                <TextField id="password" required={false} type="password" floatingLabelText="*******"/>
	                <div className="loginButtons">
	                    <RaisedButton className="button" label="Login" type="submit" primary={true} />
                        <RaisedButton className="button" label="Login with Google" href={`${API_URL}/auth/google`} primary={true} />
                        <RaisedButton className="button" href="/#/signup" label="Signup" primary={true} />
	                </div>
                </form>
            </div>
        );
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

}

export default Login;
