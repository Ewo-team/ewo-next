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

export const action = (payload) => {
  socket.emit('action', payload, resp => {
    console.log(resp);
  });
};

export const actionBatch = (payload) => {
  socket.emit('actionBatch', payload, resp => {
    console.log(resp);
  });
};

export const update = (payload) => {
  socket.emit('update', payload, resp => {
    console.log(resp);
  });
};
