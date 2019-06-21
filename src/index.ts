/*
  Server Index File
*/
import { loadDatabases } from '@engine/actions';
import { makeStore, store } from '@engine/store';
import { GameServer } from '@server/server';
import { startSocket } from '@server/socket';
import { runCommands } from '@tasks';
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

store.dispatch(loadDatabases());

/*console.log('prepare command');
addCommand(CommandList.move, {
  mat: 1,
  Direction: Direction.North,
});
console.log('end command');*/

// runCommands.autoSave(store);
