/**
 * @module Engine.Characters
 * Characters actions
 */

import { IMapsState } from '@engine/Maps/reducers';
import { Character, Races } from '@models';
import { Action } from 'redux';

//#region ActionType
export enum CharacterActions {
  MOVE = 'CharacterActions.MOVE',
  CREATE = 'CharacterActions.CREATE',
  UPDATE_MOTD = 'CharacterActions.UPDATE_MOTD',
  // CHANGE_DEXTERITY = 'CharacterActions.CHANGE_DEXTERITY',
  // ATTACK = 'CharacterActions.ATTACK',
  // DAMAGE = 'CharacterActions.DAMAGE',
  // CHANGE_POSTURE = 'CharacterActions.CHANGE_POSTURE',
}

export enum CharactersActions {
  LOAD_DATABASE = 'CharactersActions.LOAD_DATABASE',
  SAVE_DATABASE = 'CharactersActions.SAVE_DATABASE',
  LINK_TO_MAP = 'CharactersActions.LINK_TO_MAP',
}

export type CharacterActionsType = Action<CharacterActions>;

export type MoveAction = CharacterActionsType & { character: Character, newX: number, newY: number, cost: number };
export type CreateAction = CharacterActionsType & { owner: number, name: string, race: Races };
export type UpdateMotdAction = CharacterActionsType & { character: Character, message: string };

//#endregion ActionType

export const move = (character: Character, newX: number, newY: number, cost: number): MoveAction => ({
  type: CharacterActions.MOVE,
  character,
  newX,
  newY,
  cost,
});

export const create = (owner: number, name: string, race: Races): CreateAction => ({
  type: CharacterActions.CREATE,
  owner,
  name,
  race,
});

export const updateMotd = (character: Character, message: string): UpdateMotdAction => ({
  type: CharacterActions.UPDATE_MOTD,
  character,
  message,
});

export const loadDatabase = () => ({
  type: CharactersActions.LOAD_DATABASE,
});

export const saveDatabase = () => ({
  type: CharactersActions.SAVE_DATABASE,
});

export const linkToMap = (maps: IMapsState) => ({
  type: CharactersActions.LINK_TO_MAP,
  maps,
});
