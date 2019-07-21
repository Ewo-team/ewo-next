/**
 * @module Client.Redux
 */

import { CharacterFrontend, ViewFrontend } from '@models';
import { Dispatch } from 'redux';

export enum Actions {
  REFRESH_CHARACTERS = 'REFRESH_CHARACTERS',
  REFRESH_MAPS = 'REFRESH_MAPS',
  SET_SELECTED_CHARACTER = 'SET_SELECTED_CHARACTER',
  SOCKET_ACTION = 'SOCKET_ACTION',
  SOCKET_ACTIONS = 'SOCKET_ACTIONS',
  SOCKET_UPDATE = 'SOCKET_UPDATE',
}

export const refreshCharacters = (characters: Record<string, CharacterFrontend>) => ({
  type: Actions.REFRESH_CHARACTERS,
  characters,
});

export const refreshMaps = (mat: number, views: ViewFrontend[]) => ({
  type: Actions.REFRESH_MAPS,
  mat,
  views,
});

export const setSelectedCharacter = (mat: number) => ({
  type: Actions.SET_SELECTED_CHARACTER,
  mat,
});

export const selectCharacter = (mat: number) => (dispatch: Dispatch<any>) => {
  dispatch(setSelectedCharacter(mat));
};
