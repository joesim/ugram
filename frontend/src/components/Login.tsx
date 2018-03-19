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
                    <RaisedButton label="Login with Google" href={`${API_URL}/auth/google`} primary={true} />
                    <RaisedButton href="/#/signup" label="Signup" primary={true} />
                </form>
            </div>
        );
    }
}

export default Login;
