/**
 * @module Engine.Maps
 * Maps & Coords
 * @preferred
 */

import { IStateServer } from '@engine/reducers';
import { Coord, CoordEnvironmentFrontend, Direction, Plan, RawMap } from '@models';
import { List } from 'immutable';
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

  public static getCoordsFromAroundPosition = (centerX: number, centerY: number, plan: string, insight: number, store: Store<IStateServer>) => {
    const xMin = centerX - insight;
    const xMax = centerX + insight;

    const yMin = centerY - insight;
    const yMax = centerY + insight;

    const getCoords = store.getState().Maps.get(plan);

    if (getCoords !== undefined) {
      return getCoords.filter(c =>
        c.x >= xMin &&
        c.x <= xMax &&
        c.y >= yMin &&
        c.y <= yMax);
    }

    return List();
  }

  public static getCoordMeta = (plan: Plan, posX: number, posY: number) => {
    let rawMap: RawMap;
    if (!MapsTools.loadedMaps.has(plan.rawMapName)) {
      // tslint:disable-next-line: non-literal-require
      rawMap = require(`../resources/maps/${plan.rawMapName}`);
      // import * from '../resources/maps/'
      MapsTools.loadedMaps = MapsTools.loadedMaps.set(plan.rawMapName, rawMap);
    } else {
      rawMap = MapsTools.loadedMaps.get(plan.rawMapName);
    }

    const meta = rawMap.meta[posX][posY] !== null ? rawMap.meta[posX][posY] : {};

    meta.block = rawMap.block[posX][posY] === 1;

    return meta;
  }

  public static getCoordsEnvironment = (plan: Plan, minX: number, minY: number, maxX: number, maxY: number) => {
    let rawMap: RawMap;
    if (!MapsTools.loadedMaps.has(plan.rawMapName)) {
      // tslint:disable-next-line: non-literal-require
      rawMap = require(`../resources/maps/${plan.rawMapName}`);
      // import * from '../resources/maps/'
      MapsTools.loadedMaps = MapsTools.loadedMaps.set(plan.rawMapName, rawMap);
    } else {
      rawMap = MapsTools.loadedMaps.get(plan.rawMapName);
    }

    const metas: CoordEnvironmentFrontend[] = [];

    for (let posX = minX; posX <= maxX; posX += 1) {
      for (let posY = minY; posY <= maxY; posY += 1) {

        const tiles = rawMap.tiles[posX][posY];

        // tslint:disable-next-line: no-for-in forin
        for (const layer in tiles) {
          const meta: CoordEnvironmentFrontend = {
            x: posX,
            y: posY,
            type: 'env',
            tile: tiles[layer],
            layer: Number.parseInt(layer, 10),
          };

          metas.push(meta);
        }
      }
    }

    return metas;
  }

  private static loadedMaps: Map<string, RawMap> = new Map();
}
