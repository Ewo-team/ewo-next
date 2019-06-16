import * as async from 'async';
import { Store } from 'redux';
import { store } from '../..';
import { saveDatabase as saveCharacters } from '../Characters/actions';
import { Command } from '../Commands/Command';
import { saveDatabase as saveMaps } from '../Maps/actions';
import { IState } from '../reducers';

export namespace runCommands {
  export const makeQueue = () => {

    const q = async.queue(
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

    (q.drain as any)(() => {
      console.log('the queue is completed');
    });

    return q;
  };

  export const autoSave = (iStore: Store<IState>) => {

    console.log('auto-save...');

    // store.dispatch(saveMaps());
    iStore.dispatch(saveCharacters());
  };
}
