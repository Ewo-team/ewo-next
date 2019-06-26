import { MoveCommand } from '@commands/moveCommand';
import { IStateServer } from '@engine/reducers';
import { RunCommands } from '@tasks';
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
}

export interface Command {
  command: CommandList;
  payload: any;
  status: CommandStatus;
  eligible(payload, store: Store<IStateServer>): boolean | { result: boolean, meta: any };
  execute(payload, store: Store<IStateServer>): AnyAction[];
}

export const commandsTemplates = (command: CommandList, payload: any) => {

  let template = {} as Command;
  switch (command) {
    case CommandList.move:
      template = new MoveCommand(payload);
      break;
    default:
      break;
  }

  return template;
};

export const addCommand = (command: CommandList, payload: any) => {
  RunCommands.queueCommand.push(commandsTemplates(command, payload));
};

export const addLazyCommand = (command: Command) => {
  if (RunCommands.queueCommand.length() > 0) {
    RunCommands.lazyCommands = RunCommands.lazyCommands.push(command);
  } else {
    RunCommands.queueCommand.push(command);
  }
};
