import { Buff, Plan } from '.';

export interface Character {
  mat: number;
  name: string;

  grade: CharacterGrade;

  motd: string;

  minutes: number | null;

  race: string;

  owner: number;

  hp; // current health points
  maxHp; // max health points (does not count default race value)
  regen; // number in percent of hp regeneration by full cycle.
  insight; // distance of view
  speed; // number of movement points
  speedPoints;

  dexterity; // number of atq/defense points
  posture: CharacterPosture;
  ap; // current action point

  strength; // damage
  agility; // number on actions points

  debuffRegen;
  magic; // level of magic

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
  x: number;
  y: number;
}

export enum CharacterPosture {
  Default,
  Attack,
  Defence,
  Channeling,
}
