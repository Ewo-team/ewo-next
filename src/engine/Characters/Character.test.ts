/// <reference types="jest" />

import { Character, CharactersTools } from './Character';

describe('Character model', () => {

  describe('creation', () => {

    it('hydrate from json', () => {
      const json = `{
        "hp": 40,
        "regen": 5,
        "insight": 3,
        "speed": 4,
        "dexterity": 10,
        "strength": 4,
        "agility": 2,
        "xp": 0,
        "ap": 0,
        "mat": 1,
        "name": "perso 1",
        "race": "ange",
        "owner": 1
      }`;
      const expected = {} as Character;

      expected.hp = 40;
      expected.regen = 5;
      expected.insight = 3;
      expected.speed = 4;
      expected.dexterity = 10;
      expected.strength = 4;
      expected.agility = 2;
      expected.xp = 0;
      expected.ap = 0;
      expected.mat = 1;
      expected.name = 'perso 1';
      expected.race = 'ange';
      expected.owner = 1;

      const perso = CharactersTools.hydrater(JSON.parse(json));

      expect(perso).toEqual(expected);
    });

  });

});
