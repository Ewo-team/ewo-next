/**
 * @module Server.Socket
 * Socket.IO Server
 */

import { CharactersTools } from '@engine/Characters/CharacterTools';
import { CoordsTools } from '@engine/Maps/CoordsTools';
import { MapsTools } from '@engine/Maps/MapsTools';
import { IStateServer } from '@engine/reducers';
import { Plans } from '@engine/resources';
import { UsersTools } from '@engine/Users/UsersTools';
import { ViewFrontend } from '@models';
import { Store } from 'redux';
import { registerEventReceiver } from './eventReceiver';

export interface ClientPool {
  userId: number;
  charId: number[];
  characters: string;
  maps: string;
}

export const getClientState = (charId: number[], store: Store<IStateServer>) => {
  const charactersObj = store.getState().Characters.filter(c => charId.includes(c.mat)).map(CharactersTools.toFrontEnd);

  const view: Record<string, ViewFrontend> = {};
  charactersObj.forEach(character => {

    view[character.mat] = {} as ViewFrontend;

    view[character.mat].pov = [];

    if (!character.coord) {
      view[character.mat].characters = [];
    } else {
      const plan = Plans[character.coord.plan];

      const positions = MapsTools.getPositionsFromAroundPosition(character.coord.x, character.coord.y, character.insight);

      view[character.mat].environment = MapsTools.getCoordsEnvironment(plan, positions);
      view[character.mat].tileImage = MapsTools.getMapsInfo(plan);

      view[character.mat].characters = MapsTools.getCoordsFromAroundPosition(plan, positions, store).map(CoordsTools.toFrontendLimited).toArray();
    }
  });

  const characters = JSON.stringify(charactersObj);
  const maps = JSON.stringify(view);

  return {
    characters,
    maps,
  };
};

export const startSocket = (http, session, store: Store<IStateServer>) => {

  let clients: ClientPool[] = [];
  // tslint:disable-next-line: no-var-requires
  const io = require('socket.io')(http);

  io.use((socket, next) => {
    session(socket.request, socket.request.res, next);
  });

  store.subscribe(
    () => {

      // parcourir chaque room
      // pour chacune, récupérer le n° d'user
      clients.forEach(client => {

        const { characters, maps } = getClientState(client.charId, store);

        const room = `user_${client.userId}`;

        if (client.characters !== characters) {
          console.log(`send updated characters to ${room}`);
          io.to(room).emit('character', characters);
          client.characters = characters;
        }

        if (client.maps !== maps) {
          console.log(`send updated maps to ${room}`);
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
        console.log(`send initial characters to ${room}`);
        io.to(room).emit('characters', characters);

        console.log(`send initial maps to ${room}`);
        io.to(room).emit('maps', maps);
      });

    }

    registerEventReceiver(socket);

    /*socket.on('action', (data) => {
      console.log(data);
    });

    socket.on('actionBatch', (data) => {
      console.log(data);
    });

    socket.on('update', (data) => {
      console.log(data);
    });*/

    socket.on('disconnecting', () => {

      if (socket.request.session.user !== undefined) {
        const userId = socket.request.session.user.id;
        clients = clients.filter(c => c.userId !== userId);
      }
    });
  });
};
