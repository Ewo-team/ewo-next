/**
 * @module Engine.Models
 * Character representations
 */

import { Buff, Classes, Grade, Plan, Race, RaceId } from '@models';
import { Coord } from '../Maps';
import { Genre } from './Genre';

export enum CharacterStates {
  Hp = 'hp',
  RegenHp = 'regenHp',
  Speed = 'speed',
  RegenSpeed = 'regenSpeed',
  Dexterity = 'dexterity',
  Strength = 'strength',
  Insight = 'insight',
  Agility = 'agility',
  RegenAgility = 'regenAgility',
  Magic = 'magic',
}

export interface Character {

  mat: number;
  name: string;

  grade: Grade;
  classes: Classes;

  motd: string;
  minutes: number | null;

  race: RaceId;
  genre: Genre;

  owner: number;

  /**
   * maxState = race state + grade state + character leveling
   * state = max state with bonus / malus
   */

  //#region HP
  hp; // calculated
  currentHp;
  maxHp; // calculated
  levelHp;
  modifHp; // calculated
  bonusHp; // calculated
  malusHp; // calculated
  //#endregion

  //#region Regen HP
  regenHp; // calculated
  maxRegenHp; // calculated
  levelRegenHp;
  modifRegenHp; // calculated
  bonusRegenHp; // calculated
  malusRegenHp; // calculated
  //#endregion

  //#region speed
  speed; // calculated
  currentSpeed;
  maxSpeed; // calculated
  levelSpeed;
  modifSpeed; // calculated
  bonusSpeed; // calculated
  malusSpeed; // calculated
  //#endregion

  //#region Regen speed
  regenSpeed; // calculated
  maxRegenSpeed; // calculated
  levelRegenSpeed;
  modifRegenSpeed; // calculated
  bonusRegenSpeed; // calculated
  malusRegenSpeed; // calculated
  //#endregion

  //#region dexterity
  currentDexterity; // calculated
  dexterity; // calculated
  levelDexterity;
  modifDexterity; // calculated
  bonusDexterity; // calculated
  malusDexterity; // calculated
  //#endregion

  //#region strength
  currentStrength; // calculated
  strength; // calculated
  levelStrength;
  modifStrength; // calculated
  bonusStrength; // calculated
  malusStrength; // calculated
  //#endregion

  //#region insight
  currentInsight; // calculated
  insight; // calculated
  levelInsight;
  modifInsight; // calculated
  bonusInsight; // calculated
  malusInsight; // calculated
  //#endregion

  //#region agility
  agility; // calculated
  currentAgility;
  maxAgility; // calculated
  levelAgility;
  modifAgility; // calculated
  bonusAgility; // calculated
  malusAgility; // calculated
  //#endregion

  //#region Regen agility
  regenAgility; // calculated
  maxRegenAgility; // calculated
  levelRegenAgility;
  modifRegenAgility; // calculated
  bonusRegenAgility; // calculated
  malusRegenAgility; // calculated
  //#endregion

  //#region magic
  currentMagic; // calculated
  magic; // calculated
  levelMagic;
  modifMagic; // calculated
  bonusMagic; // calculated
  malusMagic; // calculated
  //#endregion

  posture: CharacterPosture;
  xp; // experience point
  ep; // enhancement point

  buffs: Buff[];
  position?: {
    plan: Plan;
    coord: Coord;
  };

}

interface CharacterFrontendExclude {
  position;
  modifHp;
  modifRegenHp;
  modifSpeed;
  modifRegenSpeed;
  modifDexterity;
  modifStrength;
  modifInsight;
  modifAgility;
  modifRegenAgility;
  modifMagic;
  bonusHp;
  bonusRegenHp;
  bonusSpeed;
  bonusRegenSpeed;
  bonusDexterity;
  bonusStrength;
  bonusInsight;
  bonusAgility;
  bonusRegenAgility;
  bonusMagic;
  malusHp;
  malusRegenHp;
  malusSpeed;
  malusRegenSpeed;
  malusDexterity;
  malusStrength;
  malusInsight;
  malusAgility;
  malusRegenAgility;
  malusMagic;
}

interface CharacterFrontendPick {
  mat;
  name;
  grade;
  race;
  genre;
  xp;
}

export type CharacterFrontend = Omit<Character, keyof CharacterFrontendExclude> & {
  coord?: {
    x: number;
    y: number,
    plan: string,
  };
};
export type CharacterLimitedFrontend = Pick<CharacterFrontend, keyof CharacterFrontendPick>;

interface CharacterDatabasePick {
  mat;
  name;
  race;
  grade;
  classes;
  motd;
  minutes;
  owner;
  posture;
  xp;
  ep;
  buffs;
  currentHp;
  levelHp;
  levelRegenHp;
  currentSpeed;
  levelSpeed;
  levelRegenSpeed;
  levelDexterity;
  levelStrength;
  levelInsight;
  currentAgility;
  levelAgility;
  levelRegenAgility;
  levelMagic;
}

export type CharacterDatabase = Pick<Character, keyof CharacterDatabasePick> & {
  genre: number;
  maps: string;
};

export enum CharacterPosture {
  Default,
  Attack,
  Defence,
  Channeling,
}
