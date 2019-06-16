import { createSelector } from 'reselect';
import { IState } from '../../reducers';
import { limitedCharacterFromCharacter } from './LimitedCharacter';

const charactersSelector = (state: IState) => state.Characters;

export const ownedCharacters = ownerId => {

  return createSelector(
    charactersSelector,
    characters => {
      return characters.filter(character => {
        return character.owner === ownerId;
      });
    },
  );
};

export const notOwnedCharacters = ownerId => {

  return createSelector(
    charactersSelector,
    characters => {

      return characters
        .filter(character => {
          return character.owner !== ownerId;
        }).map((character) => {
          return limitedCharacterFromCharacter(character);
        });
    },
  );
};
