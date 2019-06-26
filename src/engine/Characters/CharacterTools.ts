import { IStateServer } from '@engine/reducers';
import { RaceTemplate } from '@engine/resources';
import { Character, CharacterPosture, GradeTemplate, RaceFromString, Races } from '@models';
import { Store } from 'redux';

const levelHpModifier = 1;
const levelRegenHpModifier = 1;

const levelSpeedModifier = 1;
const levelRegenSpeedModifier = 1;

const levelDexterityModifier = 1;

const levelStrengthModifier = 1;

const levelAgilityModifier = 1;
const levelRegenAgilityModifier = 1;

const levelInsightModifier = 1;

const levelMagicModifier = 1;

export class CharactersTools {

  public static factory = (mat, name, values?): Character => {

    const character = {} as Character;

    character.mat = mat;
    character.name = name;

    if (values !== undefined) {

      if (values.race !== undefined) {
        character.race = RaceFromString(values.race);
      } else {
        character.race = Races.NoRace;
      }

      if (values.position !== undefined) {
        character.position = values.position;
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

    return CharactersTools.updateCharacter(character);
  }

  public static findCharacter = (iMat: number | string, store: Store<IStateServer>): Character => {
    const mat = typeof iMat === 'string' ? Number(iMat) : iMat;
    return store.getState().Characters.find(c => c.mat === mat);
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

  public static updateCharacter(character: Character): Character {

    character.maxHp =
      (character.levelHp * levelHpModifier) +
      RaceTemplate[character.race].hp + GradeTemplate(character.grade).hp;
    character.hp = character.maxHp + character.modifHp;

    character.maxRegenHp =
      (character.levelRegenHp * levelRegenHpModifier) +
      RaceTemplate[character.race].regenHp + GradeTemplate(character.grade).regenHp;
    character.regenHp = character.maxRegenHp + character.modifRegenHp;

    character.maxSpeed =
      (character.levelSpeed * levelSpeedModifier) +
      RaceTemplate[character.race].speed + GradeTemplate(character.grade).speed;
    character.speed = character.maxSpeed + character.modifSpeed;

    character.maxRegenSpeed =
      (character.levelRegenSpeed * levelRegenSpeedModifier) +
      RaceTemplate[character.race].regenSpeed + GradeTemplate(character.grade).regenSpeed;
    character.regenSpeed = character.maxRegenSpeed + character.modifRegenSpeed;

    character.dexterity =
      (character.levelDexterity * levelDexterityModifier) +
      RaceTemplate[character.race].dexterity + GradeTemplate(character.grade).dexterity;
    character.currentDexterity = character.dexterity + character.modifDexterity;

    character.strength =
      (character.levelStrength * levelStrengthModifier) +
      RaceTemplate[character.race].strength + GradeTemplate(character.grade).strength;
    character.currentStrength = character.strength + character.modifStrength;

    character.insight =
      (character.levelInsight * levelInsightModifier) +
      RaceTemplate[character.race].insight + GradeTemplate(character.grade).insight;
    character.currentInsight = character.insight + character.modifInsight;

    character.maxAgility =
      (character.levelAgility * levelAgilityModifier) +
      RaceTemplate[character.race].agility + GradeTemplate(character.grade).agility;
    character.agility = character.maxAgility + character.modifAgility;

    character.maxRegenAgility =
      (character.levelRegenAgility * levelRegenAgilityModifier) +
      RaceTemplate[character.race].regenAgility + GradeTemplate(character.grade).regenAgility;
    character.regenAgility = character.maxRegenAgility + character.modifRegenAgility;

    character.magic =
      (character.levelMagic * levelMagicModifier) +
      RaceTemplate[character.race].magic + GradeTemplate(character.grade).magic;
    character.currentMagic = character.magic + character.modifMagic;

    return character;

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
