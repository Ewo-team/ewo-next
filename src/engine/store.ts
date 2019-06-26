import { isImmutable } from 'immutable';
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import reduxThunk from 'redux-thunk';
import { Logger } from './node-logger';
import { rootReducer } from './reducers';

export const makeStore = () => {

  const hasLog = ['1', 'true', 'action'].includes(process.env.SERVER_LOG);

  console.log({ hasLog });

  if (hasLog) {

    const onlyAction = process.env.SERVER_LOG === 'action';
    console.log({ onlyAction });

    const ImmutableStateTransformer = (state) => {
      if (isImmutable(state)) {
        return state.toJS();
      }

      return state;
    };

    const EmptyStateTransformer = () => {
      return null;
    };

    const options: any = {};

    options.stateTransformer = onlyAction ? EmptyStateTransformer : ImmutableStateTransformer;
    options.logger = Logger;

    if (onlyAction) {
      options.collapsed = true;
      options.duration = true;
    }

    const loggerMiddleware = createLogger(options);

    const middlewares = [reduxThunk, loggerMiddleware];

    store = createStore(rootReducer, applyMiddleware(...middlewares));
  } else {
    const middlewares = [reduxThunk];

    store = createStore(rootReducer, applyMiddleware(...middlewares));
  }
};

export let store;
