/*
  Server Index File
*/
import { loadDatabases } from '@engine/actions';
import { makeStore, store } from '@engine/store';
import { GameServer } from '@server/server';
import { RunCommands } from '@tasks';
import * as path from 'path';

require('dotenv').config();

// tslint:disable-next-line: no-namespace
declare namespace NodeJS {
  // tslint:disable-next-line: interface-name
  interface Global {
    __basedir: string;
  }
}
declare var global: NodeJS.Global;

global.__basedir = path.resolve(__dirname, '..');

makeStore();

RunCommands.makeQueues();

export const server = new GameServer(store);

server.launch();

store.dispatch(loadDatabases());

RunCommands.startAutoSave();
