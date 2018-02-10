import * as React from "react";
import * as ReactDOM from "react-dom";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import Home from "./containers/Home";
import {Pictures} from "./components/Pictures";
import {Page404} from "./components/Page404";
import Profile from "./containers/Profile";
import Signup from "./containers/Signup";
import AppBarUgram from "./containers/AppBar";
import Users from "./containers/Users";
import ErrorModal from "./containers/ErrorModal";



import {render} from "react-dom";
import {connect, Provider} from "react-redux";

import {BrowserRouter, HashRouter, Route, Switch, Redirect} from "react-router-dom";

import {store} from "./store";
import * as userActions from "./actions/Profile"
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
                <ErrorModal/>
                <BrowserRouter>
                    <HashRouter>
                        <div>
                            <AppBarUgram/>
                            <Switch>
                                <PrivateRoute exact={true} path="/" title={"Home"} component={Home}/>
                                <PrivateRoute path="/pictures" title={"Pictures"} component={Pictures}/>
                                <Route path="/signup" title={"Signup"} render={(props) => <Signup/>}/>
                                <Route path="/users/:id" title={"User profile"} component={Profile}/>
                                <Route path="/users" title={"Users"} render={(props) => <Users/>}/>
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
