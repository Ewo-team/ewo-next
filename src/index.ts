/*
  Server Index File
*/
import * as path from 'path';
import { loadDatabase as loadCharacters } from './engine/Characters/actions';
import { loadDatabase as loadMaps } from './engine/Maps/actions';
import { makeStore } from './engine/store';
import { runCommands } from './engine/tasks/runCommands';
import { startServer } from './server/server';

// tslint:disable-next-line: no-namespace
declare namespace NodeJS {
  // tslint:disable-next-line: interface-name
  interface Global {
    __basedir: string;
  }
}
declare var global: NodeJS.Global;

global.__basedir = path.resolve(__dirname, '../..');

export const store = makeStore();

export const commandQueue = runCommands.makeQueue();

startServer(store);

store.dispatch(loadCharacters());
store.dispatch(loadMaps());

runCommands.autoSave(store);
