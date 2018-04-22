import * as React from "react";
import * as ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import { Page404 } from "./components/Page404";
import Search from "./components/Search";
import AppBarUgram from "./containers/AppBar";
import ErrorModal from "./containers/ErrorModal";
import ChatMessages from "./containers/ChatMessages";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Profile from "./containers/Profile";
import Signup from "./containers/Signup";
import Users from "./containers/Users";
import Notifications from "./containers/Notifications";

import { grey800, lightBlue700 } from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { render } from "react-dom";
import { connect, Provider } from "react-redux";

import {
  BrowserRouter,
  HashRouter,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { setDefaultsFromLocalStorage } from "./axios";
import WebcamPage from "./containers/Webcam";
import { store } from "./store";

import "../scss/app.scss";
import * as io from "socket.io-client";
import { API_URL } from "./constants";

const address = (API_URL.indexOf("localhost") !== -1) ? API_URL : `${API_URL}:80`;
export const socket = io.connect(address);

const token = window.localStorage.getItem("token-06");

socket.on("connect", () => {
  socket.emit("join", {accessToken: token});
});

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
  const currentToken = window.localStorage.getItem("token-06");
  if (
    newAccessToken &&
    newAccessToken !== "" &&
    newAccessToken !== currentToken
  ) {
    window.localStorage.setItem("token-06", newAccessToken);
    if (newUserId && newUserId !== "") {
      window.localStorage.setItem("userId-06", newUserId);
    }
    setDefaultsFromLocalStorage();
    document.location.href = "/";
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        currentToken && window.localStorage.getItem("userId-06") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

const muiTheme = getMuiTheme({
  fontFamily: "Roboto, sans-serif",
  palette: {
    accent1Color: lightBlue700,
    primary1Color: grey800,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        <ErrorModal />
        <BrowserRouter>
          <HashRouter>
            <div>
              {token ? <AppBarUgram currentUser={token} /> : null}
              {token ? <Notifications /> : null}
              {token ? <ChatMessages /> : null}
              <Switch>
                <PrivateRoute
                  exact={true}
                  path="/"
                  title={"Home"}
                  component={Home}
                />
                <PrivateRoute
                  path="/users/:id"
                  title={"User profile"}
                  component={Profile}
                />
	            <PrivateRoute
		            path="/webcam"
		            title={"User profile"}
		            component={WebcamPage}
	            />
                <PrivateRoute path="/users" title={"Users"} component={Users} />
                <Route path="/search/:id" title={"Search"} component={Search} />
                <Route path="/search" title={"Search"} component={Search} />
                <Route
                  path="/signup"
                  title={"Signup"}
                  render={() => <Signup />}
                />
                <Route
                  path="/login"
                  title={"Login"}
                  render={() => <Login />}
                />
                <Route component={Page404} />
              </Switch>
            </div>
          </HashRouter>
        </BrowserRouter>
      </div>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("app"),
);
