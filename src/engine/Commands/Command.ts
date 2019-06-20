import { runCommands } from '@commands/runCommands';
import { IStateServer } from '@engine/reducers';
import { AnyAction, Store } from 'redux';
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
  eligible(payload, store: Store<IStateServer>): boolean | { result: boolean, meta: any };
  execute(payload, store: Store<IStateServer>): AnyAction;
}

export const commandsTemplates = (command: CommandList, payload: any) => {

  let template = {} as Command;
  switch (command) {
    case CommandList.move:
      template = new moveCommand(payload);
      break;
    default:
      break;
  }

  return template;
};

export const addCommand = (command: CommandList, payload: any) => {
  runCommands.queueCommand.push(commandsTemplates(command, payload));
};
