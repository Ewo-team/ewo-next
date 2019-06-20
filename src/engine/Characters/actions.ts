import { Character } from '@models';
import { Action } from 'redux';

export enum CharacterActions {
  MOVE = 'CharacterActions.MOVE',
  CHANGE_DEXTERITY = 'CharacterActions.CHANGE_DEXTERITY',
  ATTACK = 'CharacterActions.ATTACK',
  DAMAGE = 'CharacterActions.DAMAGE',
  CHANGE_POSTURE = 'CharacterActions.CHANGE_POSTURE',
}

export enum CharactersActions {
  LOAD_DATABASE = 'CharactersActions.LOAD_DATABASE',
  SAVE_DATABASE = 'CharactersActions.SAVE_DATABASE',
}

export type CharacterActionsType = Action<CharacterActions>;

export type MoveAction = CharacterActionsType & { character: Character, maps: string, newX: number, newY: number, cost: number };

export const characterMove = (character: Character, maps: string, newX: number, newY: number, cost: number): MoveAction /*: characterMoveAction*/ => ({
  character,
  maps,
  newX,
  newY,
  cost,
  type: CharacterActions.MOVE,
});

export const loadDatabase = () => ({
  type: CharactersActions.LOAD_DATABASE,
});

export const saveDatabase = () => ({
  type: CharactersActions.SAVE_DATABASE,
});
