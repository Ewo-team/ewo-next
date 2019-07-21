/// <reference types="jest" />

import { IMapsState } from '@engine/Maps/reducers';
import { Races } from '@engine/resources';
import { Character, Coord, Genre, Classes } from '@models';
import { List, Map } from 'immutable';
import { loadDatabaseMap, saveDatabaseMap } from '../Commands/tasks';
import { CharacterActions, CharactersActions, create, linkToMap, loadDatabase, move, saveDatabase, updateMotd } from './actions';
import { CharactersTools } from './CharacterTools';
import { charactersReducer } from './reducers';

jest.mock('../Commands/tasks');

const character1 = CharactersTools.factory({ mat: 1, name: 'Test 1' });
const character2 = CharactersTools.factory({ mat: 2, name: 'Test 2' });
const character3 = CharactersTools.factory({ mat: 1, name: 'Test 3', race: 'an', genre: 0 });

character1.position = {
  coord: { x: 0, y: 0 } as Coord,
  plan: { id: 'althian', name: 'Althian', rawMapName: 'map_demo' },
};

character2.position = {
  coord: { x: 1, y: 0 } as Coord,
  plan: { id: 'althian', name: 'Althian', rawMapName: 'map_demo' },
};

describe('Characters actions', () => {
  it('should create an action to load database', () => {
    const expectedAction = {
      type: CharactersActions.LOAD_DATABASE,
    };
    expect(loadDatabase()).toEqual(expectedAction);
  });

  it('should create an action to save database', () => {
    const expectedAction = {
      type: CharactersActions.SAVE_DATABASE,
    };
    expect(saveDatabase()).toEqual(expectedAction);
  });

  it('should create an action to link to map database', () => {
    const expectedAction = {
      type: CharactersActions.LINK_TO_MAP,
      maps: Map(),
    };
    expect(linkToMap(Map())).toEqual(expectedAction);
  });
});

describe('Character actions', () => {
  it('should create an action to move', () => {
    const expectedAction = {
      type: CharacterActions.MOVE,
      character: character1,
      newX: 1,
      newY: 1,
      cost: 2,
    };
    expect(move(character1, 1, 1, 2)).toEqual(expectedAction);
  });

  it('should create an action to create a character', () => {
    const expectedAction = {
      type: CharacterActions.CREATE,
      owner: 1,
      name: 'test',
      race: 'an',
      genre: Genre.Male,
    };
    expect(create(1, 'test', 'an', Genre.Male)).toEqual(expectedAction);
  });

  it('should create an action to update the MotD', () => {
    const expectedAction = {
      type: CharacterActions.UPDATE_MOTD,
      character: character1,
      message: 'jest',
    };
    expect(updateMotd(character1, 'jest')).toEqual(expectedAction);
  });
});

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
      expected.race = 'an';
      expected.owner = 1;
      expected.levelSpeed = 1;
      expected.buffs = [];
      expected.classes = Classes.Base;
      expected.currentAgility = 0;
      expected.currentHp = 1;
      expected.currentSpeed = 0;
      expected.ep = 0;
      expected.genre = Genre.Other;
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
      expected.motd = '';
      expected.posture = 0;
      expected.xp = 0;

      expected = CharactersTools.updateCharacter(expected);

      const perso = CharactersTools.factory(JSON.parse(json));

      expect(perso).toEqual(expected);
    });

  });

  describe('movement reducer', () => {
    const char1 = {} as Character;
    char1.currentSpeed = 5;
    char1.mat = 1;
    char1.position = { coord: { x: 1, y: 1 } } as any;

    const char2 = {} as Character;
    char2.currentSpeed = 5;
    char2.mat = 2;
    char2.position = { coord: { x: 1, y: 2 } } as any;

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

describe('Characters reducers', () => {
  it('should return the initial state', () => {
    expect(charactersReducer(undefined, {} as any)).toEqual(Map());
  });

  it('should handle LOAD_DATABASE', () => {
    const response = Map({ jest: List([]) });

    (loadDatabaseMap as any).mockResolvedValue(response);

    const test: Promise<Map<string, List<any>>> = charactersReducer(undefined, loadDatabase()) as any;

    test.then(resp => expect(resp).toEqual(response));

    expect(loadDatabaseMap).toBeCalled();
  });

  it('should handle SAVE_DATABASE', () => {

    charactersReducer(undefined, saveDatabase());
    expect(saveDatabaseMap).toBeCalled();
  });

  it('should handle LINK_TO_MAP', () => {
    const mapState: IMapsState = Map({
      althian: List([
        {
          x: 0,
          y: 0,
          character: character1,
        },
        {
          x: 1,
          y: 0,
          character: character2,
        },
      ]),
    });

    const initialState = Map([['1', character1], ['2', character2]]);

    const expected = Map([
      ['1', {
        ...character1, position: {
          coord: { character: character1, x: 0, y: 0 },
          plan: { id: 'althian', name: 'Althian', rawMapName: 'map_demo' },
        },
      }],
      ['2', {
        ...character2, position: {
          coord: { character: character2, x: 1, y: 0 },
          plan: { id: 'althian', name: 'Althian', rawMapName: 'map_demo' },
        },
      }],
    ]);

    const result = charactersReducer(initialState, linkToMap(mapState));

    expect(result).toEqual(expected);

  });

  it('should handle MOVE', () => {

    const mapState: IMapsState = Map({
      althian: List([
        {
          x: 0,
          y: 0,
          character: character1,
        },
        {
          x: 1,
          y: 0,
          character: character2,
        },
      ]),
    });

    const initialState = Map([['1', character1], ['2', character2]]);

    const state = charactersReducer(initialState, linkToMap(mapState));

    const result = charactersReducer(state, move(state.get('1'), -3, 0, 3));

    expect(result.get('1')).toEqual({
      ...character1,
      currentSpeed: -3,
      position: {
        coord: { character: character1, x: -3, y: 0 },
        plan: { id: 'althian', name: 'Althian', rawMapName: 'map_demo' },
      },
    });
  });

  it('should handle CREATE', () => {

    const result = charactersReducer(undefined, create(character3.owner, character3.name, 'an', character3.genre));

    console.log(result);

    expect(result.last()).toEqual(character3);
  });
});
