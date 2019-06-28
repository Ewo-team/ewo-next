/**
 * @module Client.Selector
 * Selectors for Redux
 */

import { Character, CoordFrontend } from '@models';
import { createSelector } from 'reselect';
import { IStateFrontend } from './reducers';

export const getMat = (state: IStateFrontend) => state.selectedCharacter;
export const getCharacters = (state: IStateFrontend) => state.characters;
export const getCoords = (state: IStateFrontend) => state.coords;

export const getSelectedCharacter = createSelector(
  [getCharacters, getMat],
  (characters: Record<string, Character>, mat): Character => {

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

export const getSelectedCoords = createSelector(
  [getCoords, getMat],
  (coords: { [key: string]: CoordFrontend[] }, mat): CoordFrontend[] => {
    if (coords[mat] !== undefined) {
      return coords[mat];
    }

    return [];
  },
);
