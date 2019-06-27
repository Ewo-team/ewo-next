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

  grade: CharacterGrade;

  motd: string;
  minutes: number | null;

  race: Races;

  owner: number;

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
