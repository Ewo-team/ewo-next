import { applyMiddleware, createStore, Store } from 'redux';
import reduxThunk from 'redux-thunk';
import { IState, rootReducer } from './reducers';

// tslint:disable-next-line: no-var-requires
const createNodeLogger = require('redux-node-logger');

export const makeStore = (): Store<IState> => {

  const loggerMiddleware = createNodeLogger({
    predicate: (getState, action) => {
      return !(action.type as string).includes('CommandsActions');
    },
    /*predicate: (getState, action) => {
      return false;
    },*/
  });

  const middlewares = [reduxThunk/*, loggerMiddleware*/];

  return createStore(rootReducer, applyMiddleware(...middlewares));
};
