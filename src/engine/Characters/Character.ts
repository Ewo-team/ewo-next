import { Store } from 'redux';
import { IState } from '../reducers';

export interface Character {
  mat: number;
  name: string;

  race: string;

  owner: number;

  hp;
  regen;
  insight; // distance of view
  speed; // number of movement points
  dexterity; // number of atq/defense points
  strength; // damage
  agility; // number on actions points

  // private magic; // level of magic

  xp;
  ap;
}

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

  export const currentCharacter = (mat, store: Store<IState>): Character | null => {
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

/*export namespace CharacterUtils {
  export const currentCharacter = (mat, store: Store<IState>): Character => store.getState().Characters.find(c => c.mat === mat);
}

export const characterHydrater = (source: any) => CharacterFactory.get(source);*/
