import { store } from '../..';

import { Command } from '../Commands/Command';

import * as async from 'async';
import { Store } from 'redux';
import { IState } from '../reducers';
import { saveDatabase as saveMaps } from '../Maps/actions';
import { saveDatabase as saveCharacters } from '../Characters/actions';

export namespace runCommands {
  export const makeQueue = () => {

    const q = async.queue((current: Command, callback) => {
      console.log(`starting task ${current.command}`);
      const test = current.eligible(current.payload, store);
      const meta = typeof test === 'boolean' ? current.payload : { ...test.meta, ...current.payload };
      const eligible = typeof test === 'boolean' ? test : test.result;
      if (eligible) {
        current.execute(meta, store);
      }

      callback();
      console.log(`ending task ${current.command}`);
    }, 1);

    (q.drain as any)(() => {
      console.log('the queue is completed');
    });

    return q;
  };

  export const autoSave = (store: Store<IState>) => {

    console.log("auto-save...");

    //store.dispatch(saveMaps());
    store.dispatch(saveCharacters());
  };
}
