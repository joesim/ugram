import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import * as React from "react";
import { setDefaultsFromLocalStorage } from "../axios";

class Signup extends React.Component<any, any> {
    public constructor(props) {
        super(props);

        this.state = {
            userId: "",
        };
        this.createUser = this.createUser.bind(this);
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
            <div className="signup">
                <TextField id="firstname" hintText="Firstname" />
                <TextField id="lastname" hintText="Lastname" />
                <TextField id="email" hintText="Email" />
                <TextField id="number" hintText="5555555555" />
                <TextField id="id" hintText="id" />
                <RaisedButton label="Create User" onClick={this.createUser} primary={true} />
            </div>
        );
    }

    private createUser() {
        const formData = new FormData();

        formData.append("firstName", document.getElementById("firstname")["value"]);
        formData.append("lastName", document.getElementById("lastname")["value"]);
        formData.append("email", document.getElementById("email")["value"]);
        formData.append("phoneNumber", document.getElementById("number")["value"]);
        formData.append("id", document.getElementById("id")["value"]);
        this.setState({ userId: document.getElementById("id")["value"]});

        this.props.signupUser(formData);
    }
}

export default Signup;
