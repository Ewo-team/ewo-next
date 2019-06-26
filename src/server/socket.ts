import { CharactersTools } from '@engine/Characters/CharacterTools';
import { CoordsTools } from '@engine/Maps/CoordsTools';
import { MapsTools } from '@engine/Maps/MapsTools';
import { IStateServer } from '@engine/reducers';
import { UsersTools } from '@engine/Users/UsersTools';
import { Store } from 'redux';

export interface ClientPool {
  userId: number;
  charId: number[];
  characters: string;
  maps: string;
}

export const getClientState = (charId: number[], store: Store<IStateServer>) => {
  const charactersObj = store.getState().Characters.filter(c => charId.includes(c.mat));
  const mapsObj = {};
  charactersObj.forEach(character => {
    if (!character.position) {
      mapsObj[character.mat] = [];
    } else {
      mapsObj[character.mat] = MapsTools.getCoordsFromAroundPosition(
        character.position.coord,
        character.position.plan,
        // character.currentInsight,
        5,
        store).map(CoordsTools.serializer);
    }
  });

  const characters = JSON.stringify(charactersObj.map(CharactersTools.serializer));
  const maps = JSON.stringify(mapsObj);

  return {
    characters,
    maps,
  };
};

export const startSocket = (http, session, store: Store<IStateServer>) => {

  let clients: ClientPool[] = [];
  // tslint:disable-next-line: no-var-requires
  const io = require('socket.io')(http);

  /*const session = require('express-session')({
    secret: 'my-secret',
    resave: true,
    saveUninitialized: true,
  });*/

  // const sharedsession = require('express-socket.io-session');

  // io.use(sharedsession(session));
  io.use((socket, next) => {
    session(socket.request, socket.request.res, next);
  });

  store.subscribe(
    () => {

      // parcourir chaque room
      // pour chacune, récupérer le n° d'user
      clients.forEach(client => {
        /*const charactersObj = store.getState().Characters.filter(c => client.charId.includes(c.mat));
        const mapsObj = {};
        charactersObj.forEach(character => {
          if (!character.position) {
            mapsObj[character.mat] = [];
          } else {
            mapsObj[character.mat] = MapsTools.getCoordsFromAroundPosition(
              character.position.coord,
              character.position.plan,
              character.currentInsight,
              store).toJSON();
          }
        });

        const characters = JSON.stringify(charactersObj.toJSON());
        const maps = JSON.stringify(mapsObj);*/

        const { characters, maps } = getClientState(client.charId, store);

        const room = `user_${client.userId}`;

        if (client.characters !== characters) {
          console.log('send updated characters to ' + room);
          io.to(room).emit('character', characters);
          client.characters = characters;
        }

        if (client.maps !== maps) {
          console.log('send updated maps to ' + room);
          io.to(room).emit('maps', maps);
          client.maps = maps;
        }
      });
    },
  );

  io.on('connection', (socket) => {

    if (socket.request.session.user) {

      if (!socket.request.session.charOwned) {
        socket.request.session.charOwned = UsersTools.ownedChar(store, socket.request.session.user);
      }

      // check  if the client is already connected
      let client = clients.find(c => c.userId === socket.request.session.user.id);

      if (client === undefined) {
        const charId = socket.request.session.charOwned;
        const { characters: charactersFresh, maps: mapsFresh } = getClientState(socket.request.session.charOwned, store);

        client = {
          userId: socket.request.session.user.id,
          characters: charactersFresh,
          maps: mapsFresh,
          charId,
        };

        clients.push(client);
      }

      const { characters, maps } = client;

      const room = `user_${socket.request.session.user.id}`;

      socket.join(room, () => {
        console.log('send initial characters to ' + room);
        io.to(room).emit('characters', characters);

        console.log('send initial maps to ' + room);
        io.to(room).emit('maps', maps);
      });

    }

    socket.on('disconnecting', () => {

      if (socket.request.session.user !== undefined) {
        const userId = socket.request.session.user.id;
        clients = clients.filter(c => c.userId !== userId);
      }
    });

    // const userId = 1; // TEMP

    // const owned = ownedCharacters(userId)(store.getState());
    // const limited = notOwnedCharacters(userId)(store.getState());
    /*const state = {
      Characters: { ...owned, ...limited },
    };*/

    // socket.emit('state', JSON.stringify(store.getState()));

    /*socket.on('login', (userdata) => {

    });
    socket.on('logout', (userdata) => {

    });*/
    /*socket.on('action', (action) => {
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
