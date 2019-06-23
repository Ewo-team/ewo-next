import { SaveDBCommand } from '@commands/saveDBCommand';
import { addLazyCommand, Command } from '@engine/Commands/Command';
import { store } from '@engine/store';
import * as async from 'async';
import { List } from 'immutable';

export class RunCommands {

  public static queueCommand: async.AsyncQueue<Command>;
  public static lazyCommands: List<Command> = List();
  public static timerTenMinute: NodeJS.Timeout;

  public static startAutoSave = () => {

    RunCommands.timerTenMinute = setInterval(
      () => {
        addLazyCommand(new SaveDBCommand());
      },
      10 * 60 * 1000);
  }

  public static makeQueues() {
    if (RunCommands.instance === null) {
      RunCommands.instance = new RunCommands();
    }
    return RunCommands.instance;
  }

  private static instance: RunCommands = null;

  private constructor() {

    RunCommands.queueCommand = async.queue(
      (current: Command, callback) => {
        console.log(`starting task ${current.command}`);
        const test = current.eligible(current.payload, store);
        const meta = typeof test === 'boolean' ? current.payload : { ...test.meta, ...current.payload };
        const eligible = typeof test === 'boolean' ? test : test.result;
        console.log({ test, meta, eligible });
        if (eligible) {
          const actions = current.execute(meta, store);
          actions.forEach(action => {
            store.dispatch(action);
          });
        }

        callback();
        console.log(`ending task ${current.command}`);
      },
      1);

    (RunCommands.queueCommand.drain as any)(() => {
      console.log('the queue is completed');
      if (RunCommands.lazyCommands.size > 0) {
        console.log('executing lazy commands');
        const commands = RunCommands.lazyCommands.toArray();
        RunCommands.lazyCommands = List();
        RunCommands.queueCommand.push(commands);
      }
    });
  }
}
