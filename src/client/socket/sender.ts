/**
 * @module Client.Socket
 * Socket.IO Event Sender
 */

import { socket } from '@client/index';

/**
 * Events type:
 * * action => an action that will be queued.
 * * actionBatch => a list of actions. Each action will be executed only if the previous action is a success.
 * * update => an immediate action, with no queue.
 *
 * Returns:
 * each event return an object that indicate : the result (boolean), the accomplished steps (batch only),
 * and a message (if errors or string formating)
 */

const emit = (request, payload) => {
  socket.emit(request, payload, resp => {
    console.log(resp);
  });
};

export const action = (payload) => emit('action', payload);
export const actionBatch = (payload) => emit('actionBatch', payload);
export const update = (payload) => emit('update', payload);
