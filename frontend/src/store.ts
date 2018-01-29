import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { Router, Route, browserHistory } from 'react-router'
import {applyMiddleware, combineReducers, createStore} from "redux";
import { appbar } from "./reducers";

const store = createStore(
    combineReducers({
        appbar,
        routing: routerReducer,
    }),
);
export {store};
