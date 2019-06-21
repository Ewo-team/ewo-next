import { IStateServer } from '@engine/reducers';
import { Character, CharacterPosture, RaceFromString, Races } from '@models';
import { Store } from 'redux';

export namespace CharactersTools {

  export const factory = (mat, name, values?): Character => {

    const character = new Character(mat, name);

    if (values !== undefined) {

      if (values.race !== undefined) {
        character.race = RaceFromString(values.race);
      } else {
        character.race = Races.NoRace;
      }

      properties.forEach((property) => {
        if (values[property] !== undefined) {
          character[property] = values[property];
        } else {
          character[property] = defaultValues[property];
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

  export const hydrater = (source: any) => CharactersTools.factory(source.mat, source.name, source);

  const defaultValues = {
    grade: {
      major: 0,
      minor: 0,
    },
    motd: '',
    minutes: 0,
    owner: 0,
    currentHp: 1,
    levelHp: 0,
    levelRegenHp: 0,
    currentSpeed: 0,
    levelSpeed: 0,
    levelRegenSpeed: 0,
    levelDexterity: 0,
    levelStrength: 0,
    levelInsight: 0,
    currentAgility: 0,
    levelAgility: 0,
    levelRegenAgility: 0,
    levelMagic: 0,
    posture: CharacterPosture.Default,
    xp: 0,
    ep: 0,
    buffs: [],
    maps: 'earth',
  };

  const properties = [
    'mat',
    'name',
    'grade',
    'motd',
    'minutes',
    'owner',
    'currentHp',
    'levelHp',
    'levelRegenHp',
    'currentSpeed',
    'levelSpeed',
    'levelRegenSpeed',
    'levelDexterity',
    'levelStrength',
    'levelInsight',
    'currentAgility',
    'levelAgility',
    'levelRegenAgility',
    'levelMagic',
    'posture',
    'xp',
    'ep',
    'buffs',
    'maps',
  ];
}
