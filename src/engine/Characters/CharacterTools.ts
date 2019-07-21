/**
 * @module Engine.Characters
 * Characters
 * @preferred
 */

import { capitalizeFirstLetter } from '@engine/Helpers';
import { IStateServer } from '@engine/reducers';
import { GradeTemplate, Plans, Races } from '@engine/resources';
import {
  Character,
  CharacterDatabase,
  CharacterFrontend,
  CharacterLimitedFrontend,
  CharacterPosture,
  CharacterStates,
  Classes,
  Genre,
} from '@models';
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

  public static factory = (values?: Partial<CharacterDatabase>): Character => {

    const character: Partial<Character> = {};

    if (values !== undefined) {

      if (values.maps !== undefined) {
        character.position = { plan: Plans[values.maps] } as any; // @TODO
      }

      CharactersTools.properties.forEach((property) => {
        if (values[property] !== undefined) {
          character[property] = values[property];
        } else if (CharactersTools.defaultValues[property] !== undefined) {
          character[property] = CharactersTools.defaultValues[property];
        }
      });
    } else {
      CharactersTools.properties.forEach((property) => {
        if (CharactersTools.defaultValues[property] !== undefined) {
          character[property] = CharactersTools.defaultValues[property];
        }
      });
    }

    return CharactersTools.updateCharacter(character as Character);
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

  // public static hydrater = (source: CharacterDatabase): Character => CharactersTools.factory(source);

  public static serializer = (source: Character): CharacterDatabase => {
    const json: Partial<CharacterDatabase> = {
      mat: source.mat,
      name: source.name,
      race: source.race,
    };

    if (source.position) {
      json.maps = source.position.plan.id;
    }

    CharactersTools.properties.forEach(property => {
      json[property] = source[property];
    });

    return json as CharacterDatabase;
  }

  public static toFrontEnd = (source: Character): CharacterFrontend => {
    const dest: CharacterFrontend = Object.assign({}, source) as any;

    if (source.position) {
      dest.coord = {
        x: source.position.coord.x,
        y: source.position.coord.y,
        plan: source.position.plan.id,
      };
    }

    delete (dest as any).position;

    return dest;
  }

  public static toFrontEndLimited = (source: Character): CharacterLimitedFrontend => {
    const character = CharactersTools.toFrontEnd(source);

    return {
      genre: character.genre,
      grade: character.grade,
      mat: character.mat,
      name: character.name,
      race: character.race,
      xp: character.xp,
    };
  }

  public static updateCharacter(character: Character): Character {

    const race = Races[character.race];

    // tslint:disable-next-line: no-parameter-reassignment
    character = CharactersTools.updateBuffs(character);

    character.maxHp =
      (character.levelHp * levelHpModifier) + race.template.hp + GradeTemplate(character.grade).hp;
    character.hp = character.maxHp + character.modifHp;

    character.maxRegenHp =
      (character.levelRegenHp * levelRegenHpModifier) + race.template.regenHp + GradeTemplate(character.grade).regenHp;
    character.regenHp = character.maxRegenHp + character.modifRegenHp;

    character.maxSpeed =
      (character.levelSpeed * levelSpeedModifier) + race.template.speed + GradeTemplate(character.grade).speed;
    character.speed = character.maxSpeed + character.modifSpeed;

    character.maxRegenSpeed =
      (character.levelRegenSpeed * levelRegenSpeedModifier) + race.template.regenSpeed + GradeTemplate(character.grade).regenSpeed;
    character.regenSpeed = character.maxRegenSpeed + character.modifRegenSpeed;

    character.dexterity =
      (character.levelDexterity * levelDexterityModifier) + race.template.dexterity + GradeTemplate(character.grade).dexterity;
    character.currentDexterity = character.dexterity + character.modifDexterity;

    character.strength =
      (character.levelStrength * levelStrengthModifier) + race.template.strength + GradeTemplate(character.grade).strength;
    character.currentStrength = character.strength + character.modifStrength;

    character.insight =
      (character.levelInsight * levelInsightModifier) + race.template.insight + GradeTemplate(character.grade).insight;
    character.currentInsight = character.insight + character.modifInsight;

    character.maxAgility =
      (character.levelAgility * levelAgilityModifier) + race.template.agility + GradeTemplate(character.grade).agility;
    character.agility = character.maxAgility + character.modifAgility;

    character.maxRegenAgility =
      (character.levelRegenAgility * levelRegenAgilityModifier) + race.template.regenAgility + GradeTemplate(character.grade).regenAgility;
    character.regenAgility = character.maxRegenAgility + character.modifRegenAgility;

    character.magic =
      (character.levelMagic * levelMagicModifier) + race.template.magic + GradeTemplate(character.grade).magic;
    character.currentMagic = character.magic + character.modifMagic;

    return character;
  }

  private static readonly properties = [
    'mat',
    'name',
    'race',
    'grade',
    'classes',
    'genre',
    'motd',
    'minutes',
    'owner',
    'posture',
    'xp',
    'ep',
    'buffs',
    'maps',
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
  ];

  private static readonly defaultValues: Partial<Character> = {
    grade: {
      major: 0,
      minor: 0,
    },
    race: 'te',
    classes: Classes.Base,
    genre: Genre.Other,
    motd: '',
    owner: 0,
    posture: CharacterPosture.Default,
    xp: 0,
    ep: 0,
    buffs: [],
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
  };

  private static updateBuffs(character: Character): Character {

    const bmDefault = {
      [CharacterStates.Agility]: 0,
      [CharacterStates.Dexterity]: 0,
      [CharacterStates.Hp]: 0,
      [CharacterStates.Insight]: 0,
      [CharacterStates.Magic]: 0,
      [CharacterStates.RegenAgility]: 0,
      [CharacterStates.RegenHp]: 0,
      [CharacterStates.RegenSpeed]: 0,
      [CharacterStates.Speed]: 0,
      [CharacterStates.Strength]: 0,
    };

    const buffCalc = character.buffs.reduce(
      (total, buff) => {

        total[buff.operation][buff.state] += buff.value;

        return total;
      },
      {
        bonus: bmDefault,
        malus: bmDefault,
      });

    Object.keys(buffCalc.bonus).forEach(s => {
      // s = CharacterStates
      const bonus = buffCalc.bonus[s];
      const malus = buffCalc.malus[s];
      const modif = bonus - malus;
      const state = capitalizeFirstLetter(s);

      const stateBonus = `bonus${state}`;
      const stateMalus = `malus${state}`;
      const stateModif = `modif${state}`;

      character[stateBonus] = bonus;
      character[stateMalus] = malus;
      character[stateModif] = modif;
    });

    return character;
  }
}
