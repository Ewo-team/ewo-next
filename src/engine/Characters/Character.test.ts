/// <reference types="jest" />

import { Character } from '@models';
import { Map } from 'immutable';
import { characterMove } from './actions';
import { CharactersTools } from './CharacterTools';
import { charactersReducer, ICharactersState } from './reducers';

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

  describe('movement reducer', () => {
    const char1 = {} as Character;
    char1.speedPoints = 5;
    char1.mat = 1;

    const char2 = {} as Character;
    char2.speedPoints = 5;
    char2.mat = 2;

    expect(char1.speedPoints).toEqual(5);

    const action1 = characterMove(char1, 'test', 0, 0, 1);
    const action2 = characterMove(char2, 'test', 0, 0, 2);

    const state1: ICharactersState = Map(JSON.parse(JSON.stringify({
      1: char1,
      2: char2,
    })));

    const state2: ICharactersState = Map(JSON.parse(JSON.stringify({
      1: char1,
      2: char2,
    })));

    expect(charactersReducer(state1, action1).toJSON()).toEqual({
      1: {
        mat: 1,
        speedPoints: 4,
      },
      2: {
        mat: 2,
        speedPoints: 5,
      },
    });

    expect(charactersReducer(state2, action2).toJSON()).toEqual({
      1: {
        mat: 1,
        speedPoints: 5,
      },
      2: {
        mat: 2,
        speedPoints: 3,
      },
    });
  });

});
