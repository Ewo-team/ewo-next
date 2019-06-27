import * as React from 'react';
import { render } from 'react-dom';
import io from 'socket.io-client';
import { App } from './App';
import { Provider } from './provider';
import { startReceiver } from './socket/receiver';
import { action, actionBatch, update } from './socket/sender';
import { createStore } from './store';
import { Actions } from './actions';

const rootElement = document.getElementById('root');
export const socket = io('/');

// Pas la meilleure solution pour envoyer à Socket.IO, mais fera l'affaire pour le moment
const socketMiddleware = _store => next => reduxAction => {
  if (reduxAction.type === Actions.SOCKET_ACTION) {
    action(reduxAction.payload);
  }
  if (reduxAction.type === Actions.SOCKET_ACTIONS) {
    actionBatch(reduxAction.payload);
  }
  if (reduxAction.type === Actions.SOCKET_UPDATE) {
    update(reduxAction.payload);
  }

  next(reduxAction);
}

export const frontendStore = createStore(socketMiddleware);

if (rootElement) {
  render(
    (
      <Provider store={frontendStore}>
        <App />
      </Provider>
    ),
    rootElement,
  );
}



startReceiver(frontendStore);
