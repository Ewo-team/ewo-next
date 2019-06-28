/**
 * @module Engine.Maps
 * Maps & Coords
 * @preferred
 */

import { IStateServer } from '@engine/reducers';
import { Coord, Direction, Plan } from '@models';
import { Store } from 'redux';

export class MapsTools {

  public static getCoordFromPosition = (plan: Plan, posX: number, posY: number, store: Store<IStateServer>): Coord | null => {
    const map = store.getState().Maps.get(plan.id);

    if (map === undefined) {
      return null;
    }

    const coord = map.find(m => m.x === posX && m.y === posY);

    if (coord !== undefined) {
      return coord;
    }

    return null;
  }

  public static getRelativePosition = (posX: number, posY: number, direction: Direction) => {

    let newX = posX; // east-west position
    let newY = posY; // north-south

    switch (direction) {
      case Direction.North:
        newY -= 1;
        break;
      case Direction.South:
        newY += 1;
        break;
      case Direction.West:
        newX -= 1;
        break;
      case Direction.East:
        newX += 1;
        break;
      case Direction.NorthWest:
        newY -= 1;
        newX -= 1;
        break;
      case Direction.NorthEast:
        newY -= 1;
        newX += 1;
        break;
      case Direction.SouthWest:
        newY += 1;
        newX -= 1;
        break;
      case Direction.SouthEast:
        newY += 1;
        newX += 1;
        break;
      default:
        break;
    }

    return { x: newX, y: newY };
  }

  public static getCoordsFromAroundPosition = (center: Coord, plan: Plan, insight: number, store: Store<IStateServer>) => {
    const xMin = center.x - insight;
    const xMax = center.x + insight;

    const yMin = center.y - insight;
    const yMax = center.y + insight;

    return store.getState().Maps.get(plan.id).filter(c =>
      c.x >= xMin &&
      c.x <= xMax &&
      c.y >= yMin &&
      c.y <= yMax);
  }
}
