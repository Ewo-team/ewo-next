import { IStateServer } from '@engine/reducers';
import { Character, CharacterPosture, RaceFromString, Races } from '@models';
import { Store } from 'redux';

export class CharactersTools {

  public static factory = (mat, name, values?): Character => {

    console.log('factory character: ', mat, name, values);
    const character = new Character(mat, name);

    if (values !== undefined) {

      if (values.race !== undefined) {
        character.race = RaceFromString(values.race);
      } else {
        character.race = Races.NoRace;
      }

      CharactersTools.properties.forEach((property) => {
        if (values[property] !== undefined) {
          character[property] = values[property];
        } else {
          character[property] = CharactersTools.defaultValues[property];
        }
      });
    } else {
      character.race = Races.NoRace;
      CharactersTools.properties.forEach((property) => {
        character[property] = CharactersTools.defaultValues[property];
      });
    }

    return character;
  }

  public static currentCharacter = (mat, store: Store<IStateServer>): Character | null => {
    const character = store.getState().Characters.find(c => c.mat === mat);

    if (character !== undefined) {
      return character;
    }

    return null;
  }

  public static hydrater = (source: any) => CharactersTools.factory(source.mat, source.name, source);

  public static serializer = (source: Character) => {
    const json: any = {
      mat: source.mat,
      name: source.name,
    };

    json.race = Races[source.race];

    CharactersTools.properties.forEach(property => {
      json[property] = source[property];
    });

    return json;
  }

  private static readonly defaultValues = {
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

  private static readonly properties = [
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
