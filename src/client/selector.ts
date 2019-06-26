import { Character, Coord, CoordFrontend } from '@models';
import { createSelector } from 'reselect';
import { IStateFrontend } from './reducers';

export const getMat = (state: IStateFrontend) => state.selectedCharacter;
export const getCharacters = (state: IStateFrontend) => state.characters;
export const getCoords = (state: IStateFrontend) => state.coords;

export const getSelectedCharacter = createSelector(
  [getCharacters, getMat],
  (characters: Record<string, Character>, mat): Character => {
    /*console.log({ characters, location: mat });
    let character = characters.find(c => {
      return c.mat === mat;
    });

    if (character === undefined && mat !== undefined) {
      character = characters[0];
    }

    return character;*/
    if (mat !== undefined) {
      if (characters[mat] !== undefined) {
        return characters[mat];
      }

      const firstMat = Object.keys(characters);
      if (firstMat.length > 0) {
        return characters[firstMat[0]];
      }
    }

    return undefined;
  },
);

export const getSelectedCoords = createSelector(
  [getCoords, getMat],
  (coords: { [key: string]: CoordFrontend[] }, mat): CoordFrontend[] => {
    if (coords[mat] !== undefined) {
      return coords[mat];
    }
    /*if (character && character.position) {
      return [character.position.coord];
    }*/
    return [];
  },
);
