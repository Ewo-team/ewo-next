export const startSocket = (http, session, store) => {

  // tslint:disable-next-line: no-var-requires
  const io = require('socket.io')(http);

  /*const session = require('express-session')({
    secret: 'my-secret',
    resave: true,
    saveUninitialized: true,
  });*/

  const sharedsession = require('express-socket.io-session');

  io.use(sharedsession(session));

  store.subscribe(
    () => io.emit('state', JSON.stringify(store.getState())),
  );

  io.on('connection', (socket) => {
    //const userId = 1; // TEMP

    //const owned = ownedCharacters(userId)(store.getState());
    //const limited = notOwnedCharacters(userId)(store.getState());
    /*const state = {
      Characters: { ...owned, ...limited },
    };*/

    socket.emit('state', JSON.stringify(store.getState()));

    /*socket.on('login', (userdata) => {
      console.log(userdata);
      socket.handshake.session.userdata = userdata;
      socket.handshake.session.save();
    });
    socket.on('logout', (userdata) => {
      console.log(userdata);
      if (socket.handshake.session.userdata) {
        delete socket.handshake.session.userdata;
        socket.handshake.session.save();
      }
    });
    socket.on('action', (action) => {
      console.log(`receive action ${action}`);
      const character = owned.first() as Character;
      switch (action) {
        case 'move':
          addCommand(CommandList.move, { CharacterMat: character.mat, Direction: Direction.North });
          break;
      }
    });*/
  });
};
