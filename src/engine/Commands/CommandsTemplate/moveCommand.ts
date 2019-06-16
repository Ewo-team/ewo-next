import { Character, CharactersTools } from '../../Characters/Character';
import { characterMove } from '../../Maps/actions';
import { MapsTools } from '../../Maps/Maps';
import { Direction } from '../../models/Direction';
import { Command } from '../Command';

export interface MovePayload {
  mat: number;
  Direction: Direction;
}

export interface MoveMeta {
  Character: Character;
  maps: string;
  x: number;
  y: number;
}

// tslint:disable-next-line: no-empty-interface
export interface MoveCommand extends Command { }

const command: MoveCommand = {
  eligible: (payload: MovePayload, store): { result: true, meta: MoveMeta } | false => {

    // get the current character
    const currentCharacter = CharactersTools.currentCharacter(payload.mat, store);
    console.log({ currentCharacter });

    if (currentCharacter === null) {
      return false;
    }

    // get the current position
    const position = MapsTools.coordsFromCharacter(currentCharacter, store);

    console.log({ position });

    if (position === null) {
      return false;
    }

    // get the new position
    const { x, y } = MapsTools.getRelativePosition(position.value.x, position.value.y, payload.Direction);

    console.log({ x, y });

    // check if the new position is free
    const coord = MapsTools.getCoordFromPosition(position.key, x, y, store);

    console.log({ coord });

    if (coord === null) {
      return {
        result: true,
        meta: {
          Character: currentCharacter,
          x,
          y,
          maps: position.key,
        },
      };
    }

    return false;
  },
  execute: (meta: MoveMeta, store) => {

    // const start = performance.now;

    // let str = '';

    /*for (let index = 0; index < 1000000000; index++) {

      const char = 65 + index % 26;
      // str += String.fromCharCode(char);
    }*/
    const action = characterMove(meta.Character, meta.maps, meta.x, meta.y);
    console.log({ meta, store, action });
    store.dispatch(action);

    // console.log(Math.floor(Math.random() * 1000));

  },
} as Command;

// tslint:disable-next-line: no-default-export
export default command;
