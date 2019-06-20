import { Command, CommandList, CommandStatus } from '@commands/Command';
import { characterMove } from '@engine/Characters/actions';
import { Character, Direction } from '@models';
import { MapsTools } from '@engine/Maps/MapsTools';
import { CharactersTools } from '@engine/Characters/CharacterTools';

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

const costMove = 1;

// tslint:disable-next-line: no-empty-interface
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

    // check if the character can move
    if (currentCharacter.speedPoints <= 0) {
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
  }

  public execute(meta: MoveMeta) {
    return characterMove(meta.Character, meta.maps, meta.x, meta.y, costMove);
  }

}

export default MoveCommand;
