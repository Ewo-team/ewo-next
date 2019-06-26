import { Buff, Plan, Races } from '.';
import { Coord } from './Maps';

// TODO temp
export const GradeTemplate = (_grade: CharacterGrade) => ({
  hp: 0,
  speed: 0,
  dexterity: 0,
  strength: 0,
  agility: 0,
  insight: 0,
  magic: 0,

  regenHp: 0,
  regenSpeed: 0,
  regenAgility: 0,
});

export interface Character {

  mat: number;
  name: string;

  grade: CharacterGrade;

  motd: string;
  minutes: number | null;

  race: Races;

  owner: number;

  //#region HP
  hp;
  currentHp;
  maxHp;
  levelHp;
  modifHp;
  bonusHp;
  malusHp;
  //#endregion

  //#region Regen HP
  regenHp;
  maxRegenHp;
  levelRegenHp;
  modifRegenHp;
  bonusRegenHp;
  malusRegenHp;
  //#endregion

  //#region speed
  speed;
  currentSpeed;
  maxSpeed;
  levelSpeed;
  modifSpeed;
  bonusSpeed;
  malusSpeed;
  //#endregion

  //#region Regen speed
  regenSpeed;
  maxRegenSpeed;
  levelRegenSpeed;
  modifRegenSpeed;
  bonusRegenSpeed;
  malusRegenSpeed;
  //#endregion

  //#region dexterity
  currentDexterity;
  dexterity;
  levelDexterity;
  modifDexterity;
  bonusDexterity;
  malusDexterity;
  //#endregion

  //#region strength
  currentStrength;
  strength;
  levelStrength;
  modifStrength;
  bonusStrength;
  malusStrength;
  //#endregion

  //#region insight
  currentInsight;
  insight;
  levelInsight;
  modifInsight;
  bonusInsight;
  malusInsight;
  //#endregion

  //#region agility
  agility;
  currentAgility;
  maxAgility;
  levelAgility;
  modifAgility;
  bonusAgility;
  malusAgility;
  //#endregion

  //#region Regen agility
  regenAgility;
  maxRegenAgility;
  levelRegenAgility;
  modifRegenAgility;
  bonusRegenAgility;
  malusRegenAgility;
  //#endregion

  //#region magic
  currentMagic;
  magic;
  levelMagic;
  modifMagic;
  bonusMagic;
  malusMagic;
  //#endregion

  posture: CharacterPosture;
  xp; // experience point
  ep; // enhancement point

  buffs: Buff[];
  maps: string;

  position?: CharacterPosition; // shorthand property for front-end character
}

export interface CharacterGrade {
  major: number;
  minor: number;
}

export interface CharacterPosition {
  plan: Plan;
  coord: Coord;
}

export enum CharacterPosture {
  Default,
  Attack,
  Defence,
  Channeling,
}
