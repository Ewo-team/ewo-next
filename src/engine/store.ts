import { applyMiddleware, createStore } from 'redux';
import reduxThunk from 'redux-thunk';
import { rootReducer } from './reducers';

// tslint:disable-next-line: no-var-requires
const createNodeLogger = require('redux-node-logger');

export const makeStore = () => {

  const loggerMiddleware = createNodeLogger({
    /*predicate: (getState, action) => {
      return !(action.type as string).includes('CommandsActions');
    },*/
    /*predicate: (getState, action) => {
      return false;
    },*/
  });

  if (process.env.SERVER_LOG) {
    const middlewares = [reduxThunk, loggerMiddleware];

    store = createStore(rootReducer, applyMiddleware(...middlewares));
  } else {
    const middlewares = [reduxThunk];

    store = createStore(rootReducer, applyMiddleware(...middlewares));
  }
};

export let store;
