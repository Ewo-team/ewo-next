/*
  Server Index File
*/
import * as path from 'path';
import { loadDatabases } from './engine/actions';
import { loadDatabase } from './engine/Characters/actions';
import { addCommand, CommandList } from './engine/Commands/Command';
import { Direction } from './engine/models/Direction';
import { makeStore } from './engine/store';
import { runCommands } from './engine/tasks/runCommands';
import { GameServer } from './server/server';
import { startSocket } from './server/socket';

declare namespace NodeJS {
  // tslint:disable-next-line: interface-name
  interface Global {
    __basedir: string;
  }
}
declare var global: NodeJS.Global;

global.__basedir = path.resolve(__dirname, '..');

export const store = makeStore();

export const commandQueue = runCommands.makeQueue();

export const server = new GameServer(store);

server.launch();

// store.dispatch(loadDatabase());
store.dispatch<any>(loadDatabases());

/*console.log('prepare command');
addCommand(CommandList.move, {
  mat: 1,
  Direction: Direction.North,
});
console.log('end command');*/

// runCommands.autoSave(store);
