import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import * as React from "react";
import { setDefaultsFromLocalStorage } from "../axios";
import Login from "./Login";

class Signup extends React.Component<any, any> {
    loginUser = () => {
        const formData = new FormData();

        formData.append("email", document.getElementById("email")["value"]);
        formData.append("password", document.getElementById("password")["value"]);
        this.setState({ email: document.getElementById("email")["value"]});
        this.setState({ password: document.getElementById("password")["value"]});

        console.log(document.getElementById("email")["value"]);
        console.log(document.getElementById("password")["value"]);
        this.props.logIn(formData);
    };
    
    public constructor(props) {
        super(props);

        this.state = {
            userId: "",
            email: "",
            password: "",
        };
        this.createUser = this.createUser.bind(this);
        this.loginUser = this.loginUser.bind(this);
    }

    public componentDidUpdate(prevProps, prevState): void {
        if (this.props.signup.tokenUrl !== "") {
            window.localStorage.setItem("token-06", this.props.signup.tokenUrl.split("token=")[1]);
            window.localStorage.setItem("userId-06", this.state.userId);
            setDefaultsFromLocalStorage();

            document.location.href = "/";
        }
    }

    public render() {
        return (
            <div>
                <a href="http://localhost:3000/auth/google">Google</a>
                <form onSubmit={this.createUser} className="signup">
                    <TextField id="firstname" required={false} type="text" floatingLabelText="First Name"/>
                    <TextField id="lastname" required={false} type="text" floatingLabelText="Last Name"/>
                    <TextField id="number" required={false} type="tel" hintText="Phone Number" floatingLabelText="format: 5555555555" />
                    <TextField id="id" required={false} type="text" floatingLabelText="id" />
                    <TextField id="email" required={true} type="email" floatingLabelText="Email" />
                    <TextField id="password" required={true} type="password" floatingLabelText="Password" />
                    <RaisedButton label="Create User" type="submit" primary={true} />
                    <RaisedButton label="Login" onClick={this.loginUser} primary={true} />
                </form>
            </div>
        );
    }

    private createUser(event) {
        event.preventDefault();
        const formData = new FormData();

        formData.append("firstName", event.target[0].value);
        formData.append("lastName", event.target[1].value);
        formData.append("id", event.target[2].value);        
        formData.append("phoneNumber", event.target[3].value);
        formData.append("email",  event.target[4].value);
        formData.append("password", event.target[5].value);
        this.setState({ userId: event.target[2].value});
        this.setState({ password: event.target[5].value});        

        this.props.signupUser(formData);
    }
}

export default Signup;
