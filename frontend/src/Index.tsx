import * as React from "react";
import * as ReactDOM from "react-dom";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import {Home} from "./components/Home";
import {Pictures} from "./components/Pictures";
import {Profile} from "./components/Profile";
import AppBarUgram from "./containers/AppBar";
import Users from "./containers/Users";

import {render} from "react-dom";
import {connect, Provider} from "react-redux";

import {BrowserRouter, HashRouter, Route, Switch} from "react-router-dom";

import {store} from "./store";

require("../scss/app.scss");

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider>
            <div>
                <BrowserRouter>
                    <HashRouter>
                        <div>
                            <AppBarUgram/>
                            <Switch>
                                <Route exact={true} path="/" title={"Home"} render={(props) => <Home/>}/>
                                <Route exact={true} path="/pictures" title="Pictures" render={(props) => <Pictures/>}/>
                                <Route path="/profile" title={"Profile"} render={(props) => <Profile/>}/>
                                <Route path="/users" title={"Users"} render={(props) => <Users/>}/>
                            </Switch>
                        </div>
                    </HashRouter>
                </BrowserRouter>
            </div>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById("app"),
);
