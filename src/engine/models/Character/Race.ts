/**
 * @module Engine.Models.Character
 * Races
 */

import { Plan } from '@models/Maps';
import { Color } from 'csstype';

export interface Race {
  id: string;
  name: string;
  color: Color;
  camps: Camp;
  plan: Plan;
  playable: boolean;
  gradeNames: {
    'traitor': string;
    [0]: string;
    [1]: string;
    [2]: string;
    [3]: string;
    [4]: string;
    [5]: string;
  };
  template: {
    hp: number;
    speed: number;
    dexterity: number;
    strength: number;
    agility: number;
    insight: number;
    magic: number;
    regenHp: number;
    regenSpeed: number;
    regenAgility: number;
  };
}

export type RaceId = 'an' | 'de' | 'hu' | 'pa' | 'le' | 'te';

export enum Camp {
  Angels,
  Demons,
  Humans,
  Parias,
  Others,
  Legends,
}
