import { IStateServer } from '@engine/reducers';
import { createSelector } from 'reselect';
import { limitedCharacterFromCharacter } from './LimitedCharacter';

const charactersSelector = (state: IStateServer) => state.Characters;

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
