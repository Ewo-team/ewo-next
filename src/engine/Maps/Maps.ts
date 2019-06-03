import { List } from 'immutable';
import { Store } from 'redux';
import { Character } from '../Characters/Character';
import { IState } from '../reducers';
import { Coord } from './Coord';
import { Direction, DirectionOctogone } from '../models/Direction';

export namespace MapsUtils {
  export const coordsFromCharacter = (character: Character, store: Store<IState>): { key: string, value: Coord } => {

    let found = null;

    store.getState().Maps.forEach((coords: List<Coord>, map: string) => {
      const coord = coords.find(c => c.mat === character.mat);
      if (coord !== null) {
        found = { key: map, value: coord };
        return;
      }
    });

    return found;
  };

  export const getCoordFromPosition = (maps: string, posX: number, posY: number, store: Store<IState>): Coord => {
    const map = store.getState().Maps.get(maps);

    return map.find(m => m.x === posX && m.y === posY);
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

    return { x: posX, y: posY };
  };
}
