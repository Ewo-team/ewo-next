import { IStateServer } from '@engine/reducers';
import { Character } from '@models';
import { Store } from 'redux';

export namespace CharactersTools {

  export const factory = (values?): Character => {
    const character = {} as Character;

    if (values !== undefined) {

      properties.forEach((property) => {
        if (values[property] !== undefined) {
          character[property] = values[property];
        }
      });
    }

    return character;
  };

  export const currentCharacter = (mat, store: Store<IStateServer>): Character | null => {
    const character = store.getState().Characters.find(c => c.mat === mat);

    if (character !== undefined) {
      return character;
    }

    return null;
  };

  export const hydrater = (source: any) => CharactersTools.factory(source);

  const properties = [
    'mat',
    'name',
    'race',
    'owner',
    'hp',
    'regen',
    'insight',
    'speed',
    'dexterity',
    'strength',
    'agility',
    'xp',
    'ap',
    'maps',
  ];
}
