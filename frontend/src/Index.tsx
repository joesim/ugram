import * as React from "react";
import * as ReactDOM from "react-dom";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import Home from "./containers/Home";
import {Pictures} from "./components/Pictures";
import {Profile} from "./components/Profile";
import Signup from "./containers/Signup";
import AppBarUgram from "./containers/AppBar";

import {render} from "react-dom";
import {connect, Provider} from "react-redux";

import {BrowserRouter, HashRouter, Route, Switch, Redirect} from "react-router-dom";

import {store} from "./store";
import { isUndefined } from "util";

require("../scss/app.scss");

const PrivateRoute = ({ component: Component, ...rest }) => {
    let token = window.localStorage.getItem("token-06");
    return (
    <Route {...rest} render={(props) => (
        token !== null
			? <Component {...props}  />
			: <Redirect to='/signup' />
	)} />
    )
};

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider>
            <div>
                <BrowserRouter>
                    <HashRouter>
                        <div>
                            <AppBarUgram/>
                            <Switch>
                                <PrivateRoute exact={true} path="/" title={"Home"} component={Home}/>
                                <PrivateRoute path="/pictures" title={"Pictures"} component={Pictures}/>
                                <PrivateRoute path="/profile" title={"Profile"} component={Profile}/>
                                <Route path="/signup" title={"Signup"} render={(props) => <Signup/>}/>
                            </Switch>
                        </div>
                    </HashRouter>
                </BrowserRouter>
            </div>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById("app"),
);
