/**
 * @module Client.Selector
 * Selectors for Redux
 */

import { CharacterFrontend, ViewFrontend } from '@models';
import { createSelector } from 'reselect';
import { IStateFrontend } from './reducers';

export const getMat = (state: IStateFrontend) => state.selectedCharacter;
export const getCharacters = (state: IStateFrontend) => state.characters;
export const getView = (state: IStateFrontend) => state.views;

export const getSelectedCharacter = createSelector(
  [getCharacters, getMat],
  (characters: Record<string, CharacterFrontend>, mat): CharacterFrontend => {

    if (mat !== undefined) {
      if (characters[mat] !== undefined) {
        return characters[mat];
      }

      const firstMat = Object.keys(characters);
      if (firstMat.length > 0) {
        return characters[firstMat[0]];
      }
    }

    return;
  },
);

export const getSelectedView = createSelector(
  [getView, getMat],
  (views: { [key: string]: ViewFrontend }, mat): ViewFrontend => {
    if (views[mat] !== undefined) {
      return views[mat];
    }

    return null;
  },
);
