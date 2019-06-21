import { applyMiddleware, compose, createStore as reduxCreateStore, Store } from 'redux';
import reduxThunk from 'redux-thunk';
import rootReducer, { IStateFrontend } from './reducers';
// import createStorybookListener from 'storybook-addon-redux-listener';

export const createStore = (): Store<IStateFrontend> => {

  const middlewares = [reduxThunk];

  if (process.env.NODE_ENV === 'development') {
    // const reduxListener = createStorybookListener();
    // middlewares.push(reduxListener);
  }

  return reduxCreateStore(rootReducer, undefined, compose(applyMiddleware(...middlewares)));

};
