import { CharactersTools } from '../../src/engine/Characters/CharacterTools';
import { Character } from '../../src/engine/models';
import { Plans, RaceTemplate } from '../../src/engine/resources';

export const characterDefaultMat1: Character = {
  ...CharactersTools.factory(1, 'Basic Character', {
    race: 'an',
    currentHp: RaceTemplate.an.hp,
    currentSpeed: RaceTemplate.an.speed,
    currentAgiliy: RaceTemplate.an.agility,
  }),
  position: {
    plan: Plans.get(0),
    coord: {
      x: 1,
      y: 2,
      character: null,
    },
  },
  minutes: 17,
};
export const characterDeadMat2 = CharactersTools.factory(2, 'Dead Character', {
  race: 'de',
  currentHp: 0,
});
export const characterFullMat3 = {
  ...CharactersTools.factory(3, 'Character in action', {
    race: 'hu',
    currentHp: RaceTemplate.an.hp * 0.6,
    currentSpeed: RaceTemplate.an.speed * 0.5,
    currentAgiliy: RaceTemplate.an.agility * 0.75,
  }),
  position: {
    plan: Plans.get(1),
    coord: {
      x: 15,
      y: -5,
      character: null,
    },
  },
};
