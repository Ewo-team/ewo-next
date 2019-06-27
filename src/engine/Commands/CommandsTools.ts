import { MotdCommand } from '@commands/motdCommand';
import { MoveCommand } from '@commands/moveCommand';
import { RunCommands } from '@engine/Commands/tasks';
import { Command, CommandList } from './Command';

export const commandsTemplates = (command: CommandList, payload: any) => {

  let template = {} as Command;
  switch (command) {
    case CommandList.move:
      template = new MoveCommand(payload);
      break;
    case CommandList.motd:
      template = new MotdCommand(payload);
      break;
    default:
      break;
  }

  return template;
};

export const addCommandAction = (command: CommandList, payload: any) => {
  console.log({ command, payload });
  RunCommands.queueCommand.push(commandsTemplates(command, payload));
};

export const addCommandUpdate = (command: CommandList, payload: any, callback?) => {
  const current = commandsTemplates(command, payload);
  RunCommands.resolveCommand(current, callback);
};

export const addLazyCommand = (command: Command) => {
  if (RunCommands.queueCommand.length() > 0) {
    RunCommands.lazyCommands = RunCommands.lazyCommands.push(command);
  } else {
    RunCommands.queueCommand.push(command);
  }
};
