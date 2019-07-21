/**
 * @module Client.Store
 * Redux Store
 */

import { applyMiddleware, compose, createStore as reduxCreateStore, Store } from 'redux';
import { createLogger } from 'redux-logger';
import reduxThunk from 'redux-thunk';
import rootReducer, { IStateFrontend } from './reducers';

export const createStore = (socketSendMiddleware?, initialState?): Store<IStateFrontend> => {

  const middlewares = [reduxThunk];

  if (socketSendMiddleware) {
    middlewares.push(socketSendMiddleware);
  }

  const hasLog = ['1', 'true', 'action'].includes(process.env.CLIENT_LOG);

  if (hasLog) {

    const onlyAction = process.env.CLIENT_LOG === 'action';

    const EmptyStateTransformer = () => {
      return null;
    };

    const options: any = {};

    if (onlyAction) {
      options.stateTransformer = EmptyStateTransformer;
      options.collapsed = true;
      options.duration = true;
    }

    const logger = createLogger(options);
    middlewares.push(logger);
  }

  return reduxCreateStore(rootReducer, initialState, compose(applyMiddleware(...middlewares)));

};
