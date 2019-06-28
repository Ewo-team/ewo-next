/**
 * @module Engine.Commands.Templates
 * Move
 */

import { move } from '@engine/Characters/actions';
import { CharactersTools } from '@engine/Characters/CharacterTools';
import { MapsTools } from '@engine/Maps/MapsTools';
import { Character, Direction } from '@models';
import { Command, CommandList, CommandStatus } from '../Command';

export interface MovePayload {
  mat: number;
  Direction: Direction;
}

export interface MoveMeta {
  Character: Character;
  x: number;
  y: number;
}

const costMove = 1;

export class MoveCommand implements Command {
  public readonly command = CommandList.move;
  public readonly payload: MovePayload;
  public status: CommandStatus;

  constructor(payload: MovePayload) {
    this.payload = payload;
  }

  public eligible(payload: MovePayload, store) {

    // get the current character
    const currentCharacter = CharactersTools.currentCharacter(payload.mat, store);
    console.log({ currentCharacter });

    if (currentCharacter === null) {
      return false;
    }

    if (!currentCharacter.position) {
      // the character is not incarned
      return false;
    }

    if (currentCharacter.currentSpeed <= 0) {
      // the character cannot move
      return false;
    }

    // get the current position
    const coord = currentCharacter.position.coord;

    console.log({ position: coord });

    if (coord === null) {
      return false;
    }

    // get the new position
    const { x, y } = MapsTools.getRelativePosition(coord.x, coord.y, payload.Direction);

    console.log({ x, y });

    // check if the new position is free
    const newCoord = MapsTools.getCoordFromPosition(currentCharacter.position.plan, x, y, store);

    console.log({ newCoord });

    if (newCoord === null) {
      return {
        result: true,
        meta: {
          Character: currentCharacter,
          x,
          y,
        },
      };
    }

    return false;
  }

  public execute(meta: MoveMeta) {
    return [move(meta.Character, meta.x, meta.y, costMove)];
  }

}
