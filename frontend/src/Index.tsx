import * as React from "react";
import * as ReactDOM from "react-dom";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import {Home} from "./components/Home";
import {Pictures} from "./components/Pictures";
import {Profile} from "./components/Profile";
import AppBarUgram from "./containers/AppBar";

import {render} from "react-dom";
import {connect, Provider} from "react-redux";

import { BrowserRouter, Link, Route, Switch} from "react-router-dom";

import {store} from "./store";

require("../scss/app.scss");

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider>
            <div>
                <BrowserRouter>
                    <div>
                        <AppBarUgram/>
                        <Route exact={true} path="/" title={"Home"} render={(props) => <Home/>} />
                        <Route path="/pictures" title={"Pictures"} render={(props) => <Pictures/>} />
                        <Route path="/profile" title={"Profile"} render={(props) => <Profile/>} />
                    </div>
                </BrowserRouter>
            </div>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById("app"),
);
