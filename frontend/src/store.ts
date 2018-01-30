import { routerReducer } from "react-router-redux";
import { combineReducers, createStore } from "redux";
import * as Reducers from "./reducers";

const store = createStore(
    combineReducers({
        ...Reducers,
        routing: routerReducer,
    }),
);
export {store};
