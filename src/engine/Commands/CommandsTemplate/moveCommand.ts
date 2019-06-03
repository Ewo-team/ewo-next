import { CharacterUtils } from '../../Characters/Character';
import { characterMove } from '../../Maps/actions';
import { MapsUtils } from '../../Maps/Maps';
import { Command } from '../Command';

const command: Command = {
  eligible: (payload, store) => {

    // get the current character
    const currentCharacter = CharacterUtils.currentCharacter(payload.mat, store);
    console.log({ currentCharacter });

    if (currentCharacter === undefined) {
      return false;
    }

    // get the current position
    const position = MapsUtils.coordsFromCharacter(currentCharacter, store);

    if (position === undefined) {
      return false;
    }

    // get the new position
    const { x, y } = MapsUtils.getRelativePosition(position.value.x, position.value.y, payload.Direction);

    // check if the new position is free
    const coord = MapsUtils.getCoordFromPosition(position.key, x, y, store);
    if (coord === undefined) {
      return {
        result: true,
        meta: {
          x,
          y,
          map: position.key,
        },
      };
    }

    return false;
  },
  execute: (meta, store) => {

    // const start = performance.now;

    // let str = '';

    /*for (let index = 0; index < 1000000000; index++) {

      const char = 65 + index % 26;
      // str += String.fromCharCode(char);
    }*/

    store.dispatch(characterMove(meta.Character, meta.maps, meta.x, meta.y));

    //console.log(Math.floor(Math.random() * 1000));

  },
} as Command;

// tslint:disable-next-line: no-default-export
export default command;
