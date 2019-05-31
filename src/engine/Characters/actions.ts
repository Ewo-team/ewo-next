import { Direction } from '../models/Direction';
import { Character } from './Character';

export enum CharacterActions {
  MOVE = 'CharacterActions.MOVE',
  CHANGE_DEXTERITY = 'CharacterActions.CHANGE_DEXTERITY',
  ATTACK = 'CharacterActions.ATTACK',
  NEW_TURN = 'CharacterActions.NEW_TURN',
}

export enum CharactersActions {
  LOAD_DATABASE = 'CharactersActions.LOAD_DATABASE',
  SAVE_DATABASE = 'CharactersActions.SAVE_DATABASE',
}

export const characterMove = (character: Character, direction: Direction) => ({
  character,
  direction,
  type: CharacterActions.MOVE,
});

export const loadDatabase = () => ({
  type: CharactersActions.LOAD_DATABASE,
});

export const saveDatabase = () => ({
  type: CharactersActions.SAVE_DATABASE,
});
