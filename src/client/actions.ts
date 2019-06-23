import { Character } from '@models';
import { Dispatch } from 'redux';
import { CharactersTools } from '../engine/Characters/CharacterTools';

export enum Actions {
  LOAD_INIT = 'LOAD_INIT',
  LOAD_SUCCESS = 'LOAD_SUCCESS',
  LOAD_ERROR = 'LOAD_ERROR',
  SET_SELECTED_CHARACTER = 'SET_SELECTED_CHARACTER',
}

export const loadInit = () => ({
  type: Actions.LOAD_INIT,
});

export const loadSuccess = (characters: Character[]) => ({
  type: Actions.LOAD_SUCCESS,
  characters,
});

export const loadError = (error: any) => ({
  type: Actions.LOAD_ERROR,
  error,
});

export const setSelectedCharacter = (mat: number) => ({
  type: Actions.SET_SELECTED_CHARACTER,
  mat,
});

export const load = () => (dispatch: Dispatch) => {
  dispatch(loadInit());

  return fetch('/api/characters', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Error - 404 Not Found');
    }

    return response.json();
  })
    .then((characters: Character[]) => {
      const char = characters.map(character => CharactersTools.hydrater(character));
      dispatch(loadSuccess(char));
    })
    .catch((error) => {
      dispatch(loadError(error));
    });
};
