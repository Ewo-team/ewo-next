/// <reference types="jest" />

import { Character, CharacterPosition, Races } from '@models';
import { Map } from 'immutable';
import { move } from './actions';
import { CharactersTools } from './CharacterTools';
import { charactersReducer } from './reducers';

describe('Character model', () => {

  describe('creation', () => {

    it('hydrate from json', () => {
      const json = `{
        "mat": 1,
        "name": "perso 1",
        "race": "an",
        "owner": 1,
        "levelSpeed": 1
      }`;

      let expected = {} as Character;

      expected.mat = 1;
      expected.name = 'perso 1';
      expected.race = Races.Angel;
      expected.owner = 1;
      expected.levelSpeed = 1;
      expected.buffs = [];
      expected.currentAgility = 0;
      expected.currentHp = 1;
      expected.currentSpeed = 0;
      expected.ep = 0;
      expected.grade = {
        major: 0,
        minor: 0,
      };
      expected.levelAgility = 0;
      expected.levelDexterity = 0;
      expected.levelHp = 0;
      expected.levelInsight = 0;
      expected.levelMagic = 0;
      expected.levelRegenAgility = 0;
      expected.levelRegenHp = 0;
      expected.levelRegenSpeed = 0;
      expected.levelStrength = 0;
      expected.maps = 'earth';
      expected.motd = '';
      expected.posture = 0;
      expected.xp = 0;

      expected = CharactersTools.updateCharacter(expected);

      const perso = CharactersTools.hydrater(JSON.parse(json));

      expect(perso).toEqual(expected);
    });

  });

  describe('movement reducer', () => {
    const char1 = {} as Character;
    char1.currentSpeed = 5;
    char1.mat = 1;
    char1.position = { coord: { x: 1, y: 1 } } as CharacterPosition;

    const char2 = {} as Character;
    char2.currentSpeed = 5;
    char2.mat = 2;
    char2.position = { coord: { x: 1, y: 2 } } as CharacterPosition;

    expect(char1.currentSpeed).toEqual(5);

    const action1 = move(char1, 0, 1, 1);
    const action2 = move(char2, 0, 2, 2);

    const state = Map({
      1: char1,
      2: char2,
    });

    expect(charactersReducer(state, action1).toJSON()).toEqual({
      1: {
        mat: 1,
        currentSpeed: 4,
        position: { coord: { x: 0, y: 1 } },
      },
      2: {
        mat: 2,
        currentSpeed: 5,
        position: { coord: { x: 1, y: 2 } },
      },
    });

    expect(charactersReducer(state, action2).toJSON()).toEqual({
      1: {
        mat: 1,
        currentSpeed: 4,
        position: { coord: { x: 0, y: 1 } },
      },
      2: {
        mat: 2,
        currentSpeed: 3,
        position: { coord: { x: 0, y: 2 } },
      },
    });
  });

});
