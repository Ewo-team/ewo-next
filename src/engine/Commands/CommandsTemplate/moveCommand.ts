import { characterMove } from "../../Characters/actions";
import { Command } from "../Command";

const command: Command = {
  eligible: (payload, store) => {
    return true;
  },
  execute: (payload, store) => {

    //const start = performance.now;

    //let str = '';

    for (let index = 0; index < 1000000000; index++) {

      const char = 65 + index % 26;
      //str += String.fromCharCode(char);
    }

    store.dispatch(characterMove(payload.Character, payload.Direction));

    console.log(Math.floor(Math.random() * 1000));

  },
} as Command;

// tslint:disable-next-line: no-default-export
export default command;
