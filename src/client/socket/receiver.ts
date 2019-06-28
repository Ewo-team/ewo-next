/**
 * @module Client.Socket
 * Socket.IO Event Receiver
 */

import { IStateFrontend } from '@client/reducers';
import { Store } from 'redux';
import { socket } from '..';
import { refreshCharacters, refreshMaps } from '../actions';

export const startReceiver = (store: Store<IStateFrontend>) => {
  socket.on('characters', (characters) => {
    store.dispatch(refreshCharacters(JSON.parse(characters)));
  });

  socket.on('maps', (maps) => {
    const mapsObj = JSON.parse(maps);
    Object.keys(mapsObj).forEach(mat => {
      store.dispatch(refreshMaps(Number(mat), mapsObj[mat]));
    });
  });
};
