import * as React from 'react';
import { render } from 'react-dom';
import { App } from './App';
import { Provider } from './provider';
import { createStore } from './store';

const rootElement = document.getElementById('root');
const store = createStore();

if (rootElement) {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootElement,
  );
}
