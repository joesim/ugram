import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import * as React from "react";
import { setDefaultsFromLocalStorage } from "../axios";

class Login extends React.Component<any, any> {

    public render() {
        return (
            <div>
                <form className="login">
                    <RaisedButton label="Login" type="submit" primary={true} />
                </form>
            </div>
        );
    }
}

export default Login;
