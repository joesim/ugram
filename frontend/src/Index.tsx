import * as React from "react";
import * as ReactDOM from "react-dom";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import {Home} from "./components/Home";
import {Pictures} from "./components/Pictures";
import Profile from "./containers/Profile";
import AppBarUgram from "./containers/AppBar";


import {render} from "react-dom";
import {connect, Provider} from "react-redux";

import {BrowserRouter, HashRouter, Route, Switch} from "react-router-dom";

import {store} from "./store";
import * as userActions from "./actions/Profile"
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
                                <Route path="/users/:id" title={"Profile"} component={Profile}/>
                            </Switch>
                        </div>
                    </HashRouter>
                </BrowserRouter>
            </div>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById("app"),
);
