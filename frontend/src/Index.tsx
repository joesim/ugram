import * as React from "react";
import * as ReactDOM from "react-dom";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import {Page404} from "./components/Page404";
import {Pictures} from "./components/Pictures";
import AppBarUgram from "./containers/AppBar";
import ErrorModal from "./containers/ErrorModal";
import Home from "./containers/Home";
import Profile from "./containers/Profile";
import Signup from "./containers/Signup";
import Users from "./containers/Users";

import { orange600 } from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { render } from "react-dom";
import {connect, Provider} from "react-redux";

import {BrowserRouter, HashRouter, Redirect, Route, Switch} from "react-router-dom";

import { isUndefined } from "util";
import * as userActions from "./actions/Profile";
import { store } from "./store";

import "../scss/app.scss";

let token =  window.localStorage.getItem("token-06");

const PrivateRoute = ({ component: Component, ...rest }) => {
    token = window.localStorage.getItem("token-06");
    return (
    <Route {...rest} render={(props) => (
        token !== null
			? <Component {...props}  />
			: <Redirect to='/signup' />
	)} />
    )
};

const  muiTheme = getMuiTheme({
	fontFamily: 'Roboto, sans-serif',
	palette: {
		primary1Color: orange600,
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
