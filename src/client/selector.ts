import { Character } from '@models';
import { createSelector } from 'reselect';
import { IStateFrontend } from './reducers';

export const getMat = (state: IStateFrontend) => state.selectedCharacter;
export const getCharacters = (state: IStateFrontend) => state.characters;

export const getSelectedCharacter = createSelector(
  [getCharacters, getMat],
  (characters: Character[], mat): Character => {
    console.log({ characters, location: mat });
    return characters.find(character => {
      return character.mat === mat;
    });
  },
);
