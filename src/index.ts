/**
 * @module index
 * Server's Bootstrap
 */

import { loadDatabases } from '@engine/actions';
import { RunCommands } from '@engine/Commands/tasks';
import { makeStore, store } from '@engine/store';
import { GameServer } from '@server/server';
import * as path from 'path';

require('dotenv').config();

// tslint:disable-next-line: no-namespace
declare namespace NodeJS {
  // tslint:disable-next-line: interface-name
  interface Global {
    /**
     * Store the project base dir path
     */
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
