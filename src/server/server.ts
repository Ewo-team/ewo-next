import * as express from 'express';
import * as path from 'path';
import * as socketio from 'socket.io';
import { Character } from '../engine/Characters/Character';
import { notOwnedCharacters, ownedCharacters } from '../engine/Characters/selector';
import { addCommand, CommandList } from '../engine/Commands/Command';
import { Direction } from '../engine/models/Direction';

declare var __basedir;

export const startServer = (store) => {

  const app = express();
  app.set('port', process.env.PORT || 3000);

  // tslint:disable-next-line: no-var-requires
  const http = require('http').Server(app);

  // tslint:disable-next-line: no-var-requires
  const io = require('socket.io')(http);

  const session = require('express-session')({
    secret: 'my-secret',
    resave: true,
    saveUninitialized: true,
  });
  const sharedsession = require('express-socket.io-session');

  app.use(session);
  io.use(sharedsession(session));

  // simple '/' endpoint sending a Hello World
  // response
  app.get('/', (req: any, res: any) => {
    // path.join(__basedir, './data', `${databaseName}.json`);
    res.sendFile(path.join(__basedir, './src/server/views/perso.html'));
  });

  app.get('/command', (req: any, res: any) => {
    // path.join(__basedir, './data', `${databaseName}.json`);
    res.sendFile(path.join(__basedir, './src/server/views/commands.html'));
  });

  app.use(express.static('dist/client'));

  // start our simple server up on localhost:3000
  const server = http.listen(3000, function () {
    console.log('listening on *:3000');
  });

  /*store.subscribe(
    () => io.emit('state', JSON.stringify(store.getState())),
  );*/

  io.on('connection', (socket) => {
    const userId = 1; // TEMP

    const owned = ownedCharacters(userId)(store.getState());
    const limited = notOwnedCharacters(userId)(store.getState());
    const state = {
      Characters: { ...owned, ...limited },
    };

    // socket.emit('state', JSON.stringify(state));

    socket.on('login', (userdata) => {
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
    });
  });
};
