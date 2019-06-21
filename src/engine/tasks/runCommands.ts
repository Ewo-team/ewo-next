import { Command } from '@engine/Commands/Command';
import { IStateServer } from '@engine/reducers';
import { store } from '@engine/store';
import * as async from 'async';
import { Action, Store } from 'redux';

export namespace runCommands {

  export let queueCommand: async.AsyncQueue<Command>;
  export let queueAction: async.AsyncQueue<Action>;

  export const makeQueues = () => {

    queueCommand = async.queue(
      (current: Command, callback) => {
        console.log(`starting task ${current.command}`);
        const test = current.eligible(current.payload, store);
        const meta = typeof test === 'boolean' ? current.payload : { ...test.meta, ...current.payload };
        const eligible = typeof test === 'boolean' ? test : test.result;
        console.log({ test, meta, eligible });
        if (eligible) {
          current.execute(meta, store);
        }

        callback();
        console.log(`ending task ${current.command}`);
      },
      1);

    queueAction = async.queue(
      (current: Action, callback) => {
        store.dispatch(current);
        callback();
      },
      1);

    (queueCommand.drain as any)(() => {
      console.log('the queue is completed');
    });
  };

  export const autoSave = (iStore: Store<IStateServer>) => {

    console.log('auto-save...');

    // store.dispatch(saveMaps());
    // iStore.dispatch(saveCharacters());
  };
}
