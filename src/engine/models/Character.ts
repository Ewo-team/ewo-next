import { RaceTemplate } from '@engine/resources';
import { Buff, Plan, Races } from '.';
import { Coord } from './Maps';

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

// TODO temp
export const GradeTemplate = (grade: CharacterGrade) => ({
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

export class Character {

  public mat: number;
  public name: string;

  public grade: CharacterGrade;

  public motd: string;

  public minutes: number | null;

  public race: Races;

  public owner: number;

  //#region HP
  public get hp() { return this.maxHp + this.modifHp; }
  public currentHp;

  public get maxHp() {
    return (this.levelHp * levelHpModifier) + RaceTemplate[this.race].hp + GradeTemplate(this.grade).hp;
  }

  public levelHp;

  public get modifHp() { /* modif */ return 0; }
  public get bonusHp() { /* bonus */ return 0; }
  public get malusHp() { /* malus */ return 0; }
  //#endregion

  //#region Regen HP
  public get regenHp() { return this.maxRegenHp + this.modifRegenHp; }

  public get maxRegenHp() {
    return (this.levelRegenHp * levelRegenHpModifier) + RaceTemplate[this.race].regenHp + GradeTemplate(this.grade).regenHp;
  }

  public levelRegenHp;

  public get modifRegenHp() { /* modif */ return 0; }
  public get bonusRegenHp() { /* bonus */ return 0; }
  public get malusRegenHp() { /* malus */ return 0; }
  //#endregion

  //#region speed
  public get speed() { return this.maxSpeed + this.modifSpeed; }
  public currentSpeed;

  public get maxSpeed() {
    return (this.levelSpeed * levelSpeedModifier) + RaceTemplate[this.race].speed + GradeTemplate(this.grade).speed;
  }

  public levelSpeed;

  public get modifSpeed() { /* modif */ return 0; }
  public get bonusSpeed() { /* bonus */ return 0; }
  public get malusSpeed() { /* malus */ return 0; }
  //#endregion

  //#region Regen speed
  public get regenSpeed() { return this.maxRegenSpeed + this.modifRegenSpeed; }

  public get maxRegenSpeed() {
    return (this.levelRegenSpeed * levelRegenSpeedModifier) + RaceTemplate[this.race].regenSpeed + GradeTemplate(this.grade).regenSpeed;
  }

  public levelRegenSpeed;

  public get modifRegenSpeed() { /* modif */ return 0; }
  public get bonusRegenSpeed() { /* bonus */ return 0; }
  public get malusRegenSpeed() { /* malus */ return 0; }
  //#endregion

  //#region dexterity
  public get currentDexterity() { return this.dexterity + this.modifDexterity; }

  public get dexterity() {
    return (this.levelDexterity * levelDexterityModifier) + RaceTemplate[this.race].dexterity + GradeTemplate(this.grade).dexterity;
  }

  public levelDexterity;

  public get modifDexterity() { /* modif */ return 0; }
  public get bonusDexterity() { /* bonus */ return 0; }
  public get malusDexterity() { /* malus */ return 0; }
  //#endregion

  //#region strength
  public get currentStrength() { return this.strength + this.modifStrength; }

  public get strength() {
    return (this.levelStrength * levelStrengthModifier) + RaceTemplate[this.race].strength + GradeTemplate(this.grade).strength;
  }

  public levelStrength;

  public get modifStrength() { /* modif */ return 0; }
  public get bonusStrength() { /* bonus */ return 0; }
  public get malusStrength() { /* malus */ return 0; }
  //#endregion

  //#region insight
  public get currentInsight() { return this.insight + this.modifInsight; }

  public get insight() {
    return (this.levelInsight * levelInsightModifier) + RaceTemplate[this.race].insight + GradeTemplate(this.grade).insight;
  }

  public levelInsight;

  public get modifInsight() { /* modif */ return 0; }
  public get bonusInsight() { /* bonus */ return 0; }
  public get malusInsight() { /* malus */ return 0; }
  //#endregion

  //#region agility
  public get agility() { return this.maxAgility + this.modifAgility; }
  public currentAgility;

  public get maxAgility() {
    return (this.levelAgility * levelAgilityModifier) + RaceTemplate[this.race].agility + GradeTemplate(this.grade).agility;
  }

  public levelAgility;

  public get modifAgility() { /* modif */ return 0; }
  public get bonusAgility() { /* bonus */ return 0; }
  public get malusAgility() { /* malus */ return 0; }
  //#endregion

  //#region Regen agility
  public get regenAgility() { return this.maxRegenAgility + this.modifRegenAgility; }

  public get maxRegenAgility() {
    return (this.levelRegenAgility * levelRegenAgilityModifier) + RaceTemplate[this.race].regenAgility + GradeTemplate(this.grade).regenAgility;
  }

  public levelRegenAgility;

  public get modifRegenAgility() { /* modif */ return 0; }
  public get bonusRegenAgility() { /* bonus */ return 0; }
  public get malusRegenAgility() { /* malus */ return 0; }
  //#endregion

  //#region magic
  public get currentMagic() { return this.magic + this.modifMagic; }

  public get magic() {
    return (this.levelMagic * levelMagicModifier) + RaceTemplate[this.race].magic + GradeTemplate(this.grade).magic;
  }

  public levelMagic;

  public get modifMagic() { /* modif */ return 0; }
  public get bonusMagic() { /* bonus */ return 0; }
  public get malusMagic() { /* malus */ return 0; }
  //#endregion

  public posture: CharacterPosture;
  public xp; // experience point
  public ep; // enhancement point

  public buffs: Buff[];
  public maps: string;

  public position?: CharacterPosition; // shorthand property for front-end character

  constructor(mat: number, name: string) {
    this.mat = mat;
    this.name = name;
  }
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
