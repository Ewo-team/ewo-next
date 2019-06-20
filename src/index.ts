/*
  Server Index File
*/
import { runCommands } from '@commands/runCommands';
import { loadDatabases } from '@engine/actions';
import { makeStore, store } from '@engine/store';
import { GameServer } from '@server/server';
import { startSocket } from '@server/socket';
import * as path from 'path';

declare namespace NodeJS {
  // tslint:disable-next-line: interface-name
  interface Global {
    __basedir: string;
  }
}
declare var global: NodeJS.Global;

global.__basedir = path.resolve(__dirname, '..');

makeStore();

runCommands.makeQueues();

export const server = new GameServer(store);

server.launch();

/// generate huge database
/*const coords: Coord[] = [];

for (let x = -500; x <= 500; x++) {
  for (let y = -500; y <= 500; y++) {
    const mat = (x * 500 + y);
    const exists = mat % 100 === 0;
    if (exists) {
      coords.push({ x, y, mat });
    }
  }
}

const map = {
  "format": "mapOfArray",
  "data": {
    "earth": coords
  },
};

fs.writeFileSync('./data/maps.json', JSON.stringify(map, null, 2));
console.log(coords);*/

// store.dispatch(loadDatabase());
store.dispatch(loadDatabases());

/*console.log('prepare command');
addCommand(CommandList.move, {
  mat: 1,
  Direction: Direction.North,
});
console.log('end command');*/

// runCommands.autoSave(store);
