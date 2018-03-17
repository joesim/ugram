import * as React from "react";
import * as ReactDOM from "react-dom";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import {Page404} from "./components/Page404";
import {Pictures} from "./components/Pictures";
import AppBarUgram from "./containers/AppBar";
import ErrorModal from "./containers/ErrorModal";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Profile from "./containers/Profile";
import Signup from "./containers/Signup";
import Users from "./containers/Users";

import { grey800 } from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { render } from "react-dom";
import {connect, Provider} from "react-redux";

import {BrowserRouter, HashRouter, Redirect, Route, Switch} from "react-router-dom";

import { isUndefined } from "util";
import * as userActions from "./actions/Profile";
import { store } from "./store";

import "../scss/app.scss";

let token =  window.localStorage.getItem("token-06");

function getParameterByName(name) {
	const url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
	const results = regex.exec(url);
	if (!results) {
		return null;
	}
	if (!results[2]) {
		return "";
	}
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const PrivateRoute = ({ component: Component, ...rest }) => {
	const newAccessToken = getParameterByName("accessToken");
	const newUserId = getParameterByName("userId");
	if (newAccessToken && newAccessToken !== "") {
		window.localStorage.setItem("token-06", newAccessToken);
	}
	if (newUserId && newUserId !== "") {
		window.localStorage.setItem("userId-06", newUserId);
	}
    return (
    <Route
	    {...rest}
	    render={(props) => (
        window.localStorage.getItem("token-06") && window.localStorage.getItem("userId-06")
			? <Component {...props}  />
			: <Redirect to="/login" />
	)} />
    );
};

const  muiTheme = getMuiTheme({
	fontFamily: "Roboto, sans-serif",
	palette: {
		primary1Color: grey800,
	},
});

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider  muiTheme={muiTheme}>
            <div>
                <ErrorModal/>
                <BrowserRouter>
                    <HashRouter>
                        <div>
                            <AppBarUgram currentUser={token}/>
                            <Switch>
                                <PrivateRoute exact={true} path="/" title={"Home"} component={Home}/>
                                <PrivateRoute path="/pictures" title={"Pictures"} component={Pictures}/>
                                <PrivateRoute path="/users/:id" title={"User profile"} component={Profile}/>
                                <PrivateRoute path="/users" title={"Users"} component={Users}/>
                                <Route path="/signup" title={"Signup"} render={(props) => <Signup/>}/>
	                            <Route path="/login" title={"Login"} render={(props) => <Login/>}/>
                                <Route component={Page404}/>
                            </Switch>
                        </div>
                    </HashRouter>
                </BrowserRouter>
            </div>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById("app"),
);
