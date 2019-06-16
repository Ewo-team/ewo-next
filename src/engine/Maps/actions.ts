import { Character } from '../Characters/Character';
import { DirectionOctogone } from '../models/Direction';
// import { Action } from 'redux';

export enum MapsActions {
  MOVE = 'MapsActions.MOVE',
  LOAD_DATABASE = 'MapsActions.LOAD_DATABASE',
  SAVE_DATABASE = 'MapsActions.SAVE_DATABASE',
}

/*export type characterMoveAction = Action<{ character: Character, maps: string, newX: number, newY: number }>;
export type loadDatabaseAction = Action<{ type: MapsActions }>;
export type saveDatabase = Action<{ type: MapsActions }>;*/

export const characterMove = (character: Character, maps: string, newX: number, newY: number) /*: characterMoveAction*/ => ({
  character,
  maps,
  newX,
  newY,
  type: MapsActions.MOVE,
});

export const loadDatabase = () => ({
  type: MapsActions.LOAD_DATABASE,
});

export const saveDatabase = () => ({
  type: MapsActions.SAVE_DATABASE,
});
