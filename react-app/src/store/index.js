import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import session from "./session";
import messageReducer from "./messages";
import channelReducer from "./channels";
import serverReducer from './servers';
import categoriesReducer from "./categories";
import memberReducer from "./members";


const rootReducer = combineReducers({    
  session,
  messages: messageReducer,
  channels: channelReducer,
  servers: serverReducer,
  categories: categoriesReducer,
  members: memberReducer

});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
