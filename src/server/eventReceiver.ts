import { addCommandAction, addCommandUpdate } from '@engine/Commands/CommandsTools';

export const registerEventReceiver = (socket: SocketIO.Socket) => {
  socket.on('action', (event) => {
    const { action, ...payload } = event;
    addCommandAction(action, payload);

  });

  socket.on('actionBatch', (event) => {
    console.log(event);
  });

  socket.on('update', (event) => {
    const { action, ...payload } = event;
    addCommandUpdate(action, payload);
  });
};
