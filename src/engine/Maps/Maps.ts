import { List } from 'immutable';
import { Store } from 'redux';
import { Character } from '../Characters/Character';
import { Direction, DirectionOctogone } from '../models/Direction';
import { IState } from '../reducers';
import { Coord } from './Coord';

export namespace MapsTools {
  export type foundType = { key: string, value: Coord } | null;
  export const coordsFromCharacter = (character: Character, store: Store<IState>): foundType => {

    let found: foundType = null;

    store.getState().Maps.forEach((coords: List<Coord>, map: string) => {
      const coord = coords.find(c => c.mat === character.mat);
      if (coord !== undefined) {
        found = { key: map, value: coord };
        return;
      }
    });

    return found;
  };

  export const getCoordFromPosition = (maps: string, posX: number, posY: number, store: Store<IState>): Coord | null => {
    const map = store.getState().Maps.get(maps);

    if (map === undefined) {
      return null;
    }

    const coord: Coord | undefined = map.find(m => m.x === posX && m.y === posY);

    if (coord !== undefined) {
      return coord;
    }

    return null;
  };

  export const getRelativePosition = (posX: number, posY: number, direction: Direction | DirectionOctogone) => {

    let newX = posX; // east-west position
    let newY = posY; // north-south

    switch (direction) {
      case Direction.North:
      case DirectionOctogone.North:
        newY -= 1;
        break;
      case Direction.South:
      case DirectionOctogone.South:
        newY += 1;
        break;
      case Direction.West:
      case DirectionOctogone.West:
        newX -= 1;
        break;
      case Direction.East:
      case DirectionOctogone.East:
        newX += 1;
        break;
      case DirectionOctogone.NorthWest:
        newY -= 1;
        newX -= 1;
        break;
      case DirectionOctogone.NorthEast:
        newY -= 1;
        newX += 1;
        break;
      case DirectionOctogone.SouthWest:
        newY += 1;
        newX -= 1;
        break;
      case DirectionOctogone.SouthEast:
        newY += 1;
        newX += 1;
        break;
      default:
        break;
    }

    return { x: newX, y: newY };
  };
}
