/**
 * @module Engine.Commands
 * Commands
 * @preferred
 */

import { IStateServer } from '@engine/reducers';
import { AnyAction, Store } from 'redux';

export enum CommandStatus {
  Queue,
  InExec,
  Completed,
}

export enum CommandList {
  saveDB,
  move,
  changeDexterity,
  attack,
  motd,
}

export interface Command {
  command: CommandList;
  payload: any;
  status: CommandStatus;
  callback?: () => void;
  eligible(payload, store: Store<IStateServer>): boolean | { result: boolean, meta: any };
  execute(payload, store: Store<IStateServer>): AnyAction[];
}
