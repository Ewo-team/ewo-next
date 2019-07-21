import { Camp, Race } from "@models";
import { Plans } from "./Maps";
import strings from './strings';

/**
 * @module Engine.Resources
 * Resources for Race
 */

const BaseCharacterTemplate = {
  hp: 1000,
  speed: 24,
  dexterity: 20,
  strength: 100,
  agility: 48,
  insight: 10,
  magic: 0,
  regenHp: 10,
  regenSpeed: 0.5,
  regenAgility: 1,
};

const PariaTemplate = {
  ...BaseCharacterTemplate,
  hp: 800,
  dexterity: 18,
};

const Angel: Race = {
  id: 'an',
  name: strings.Race.Angel.name,
  color: '#7AD4F4',
  camps: Camp.Angels,
  plan: Plans.celestia,
  playable: true,
  gradeNames: strings.Race.Angel.grade,
  template: BaseCharacterTemplate,
};

const Demon: Race = {
  id: 'de',
  name: strings.Race.Demon.name,
  color: '#9F213C',
  camps: Camp.Demons,
  plan: Plans.ciferis,
  playable: true,
  gradeNames: strings.Race.Demon.grade,
  template: BaseCharacterTemplate,
};

const Human: Race = {
  id: 'hu',
  name: strings.Race.Human.name,
  color: '#638D19',
  camps: Camp.Humans,
  plan: Plans.althian,
  playable: true,
  gradeNames: strings.Race.Human.grade,
  template: BaseCharacterTemplate,
};

const Paria: Race = {
  id: 'pa',
  name: strings.Race.Paria.name,
  color: '#55108A',
  camps: Camp.Parias,
  plan: Plans.althian,
  playable: false,
  gradeNames: strings.Race.Paria.grade,
  template: PariaTemplate,
};

const Legend: Race = {
  id: 'le',
  name: strings.Race.Legend.name,
  color: '#638D19',
  camps: Camp.Legends,
  plan: Plans.althian,
  playable: false,
  gradeNames: strings.Race.Legend.grade,
  template: BaseCharacterTemplate,
};

const Tester: Race = {
  id: 'te',
  name: strings.Race.Tester.name,
  color: '#000000',
  camps: Camp.Others,
  plan: Plans.althian,
  playable: false,
  gradeNames: strings.Race.Tester.grade,
  template: BaseCharacterTemplate,
};

export const Races = {
  an: Angel,
  de: Demon,
  hu: Human,
  pa: Paria,
  le: Legend,
  te: Tester,
};

export const RacesList = [
  Angel,
  Demon,
  Human,
  Paria,
  Legend,
  Tester,
];
