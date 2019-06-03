import { Store } from 'redux';
import { commandQueue } from '../..';
import { IState } from '../reducers';
import moveCommand from './CommandsTemplate/moveCommand';

export enum CommandStatus {
  Queue,
  InExec,
  Completed,
}

export enum CommandList {
  move,
  changeDexterity,
  attack,
}

export interface Command {
  command: CommandList;
  payload: any;
  status: CommandStatus;
  eligible(payload, store: Store<IState>): boolean | { result: boolean, meta: any };
  execute(payload, store: Store<IState>): boolean;
}

export const commandsTemplates = (command: CommandList, payload: any) => {

  let template = {} as Command;
  switch (command) {
    case CommandList.move:
      template = moveCommand;
      break;
    default:
      break;
  }

  template.status = CommandStatus.Queue;
  template.command = command;
  template.payload = payload;

  return template;
};

export const addCommand = (command: CommandList, payload: any) => {
  commandQueue.push(commandsTemplates(command, payload));
};
