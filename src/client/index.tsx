import * as React from 'react';
import { render } from 'react-dom';
import io from 'socket.io-client';
import { App } from './App';
import { Provider } from './provider';
import { startReceiver } from './socket/receiver';
import { createStore } from './store';

const rootElement = document.getElementById('root');
export const frontendStore = createStore();

if (rootElement) {
  render(
    <Provider store={frontendStore}>
      <App />
    </Provider>,
    rootElement,
  );
}

export const socket = io('/');

startReceiver(frontendStore);

// const socket = io('http://localhost:3000');
/*const socket = io('/');

socket.on('characters', (characters) => {
  frontendStore.dispatch(refreshCharacters(JSON.parse(characters)));
});

socket.on('maps', (maps) => {
  const mapsObj = JSON.parse(maps);
  Object.keys(mapsObj).forEach(mat => {
    frontendStore.dispatch(refreshMaps(Number(mat), mapsObj[mat]));
  });
});*/
