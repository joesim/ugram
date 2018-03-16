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
        this.signup = this.signup.bind(this);
    }

    public componentDidUpdate(prevProps, prevState): void {
        if (this.props.signup.tokenUrl !== "") {
            window.localStorage.setItem("token-06", this.props.signup.tokenUrl.split("token=")[1]);
            window.localStorage.setItem("userId-06", this.state.userId);
            setDefaultsFromLocalStorage();

            document.location.href = "/";
        }
    }

    signup(res){
        //const formData = new FormData();
        //formData.append("name", res.w3.ig);
        //formData.append("email",  res.w3.U3);
        //formData.append("token", res.Zi.access_token);
        //this.setState({ userId: event.target[4].value});
        //this.props.signupUser(formData);
    }

    public render() {
        const responseGoogle = (response) => {
            console.log(response);
            this.signup(response);
        } 

        return (
            <div>
                <a href="/auth/google">Google</a>
                <form onSubmit={this.createUser} className="signup">
                    <TextField id="firstname" required={true} type="text" hintText="Firstname" />
                    <TextField id="lastname" required={true} type="text" hintText="Lastname" />
                    <TextField id="email" required={true} type="email" hintText="Email" />
                    <TextField id="number" required={true} type="tel" hintText="5555555555" />
                    <TextField id="id" required={true} type="text" hintText="id" />
                    <RaisedButton label="Create User" type="submit" primary={true} />
                </form>
            </div>
        );
    }

    private createUser(event) {
        event.preventDefault();
        const formData = new FormData();

        formData.append("firstName", event.target[0].value);
        formData.append("lastName", event.target[1].value);
        formData.append("email",  event.target[2].value);
        formData.append("phoneNumber", event.target[3].value);
        formData.append("id", event.target[4].value);
        this.setState({ userId: event.target[4].value});

        this.props.signupUser(formData);
    }
}

export default Signup;
