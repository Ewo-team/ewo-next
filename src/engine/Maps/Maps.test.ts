/// <reference types="jest" />

import { CharactersTools } from '@engine/Characters/CharacterTools';
import { IStateServer } from '@engine/reducers';
import { Plans } from '@engine/resources';
import { Coord, Direction, Plan } from '@models';
import { List, Map } from 'immutable';
import { Store } from 'redux';
import configureStore from 'redux-mock-store';
import { loadDatabaseMap, saveDatabaseMap } from '../Commands/tasks';
import { loadDatabase, MapsActions, saveDatabase } from './actions';
import { CoordsTools } from './CoordsTools';
import { MapsTools } from './MapsTools';
import { mapsReducer } from './reducers';

jest.mock('../Commands/tasks');

const character1 = CharactersTools.factory(1, 'Test 1');
const character2 = CharactersTools.factory(2, 'Test 2');

describe('Maps actions', () => {
  it('should create an action to load database', () => {
    const expectedAction = {
      type: MapsActions.LOAD_DATABASE,
      characters: Map(),
    };
    expect(loadDatabase(Map())).toEqual(expectedAction);
  });

  it('should create an action to save database', () => {
    const expectedAction = {
      type: MapsActions.SAVE_DATABASE,
    };
    expect(saveDatabase()).toEqual(expectedAction);
  });
});

describe('CoordsTools', () => {

  const jsonCoord = JSON.parse('{"x": 0,"y": 0,"mat": 1}');
  const coord = {
    x: 0,
    y: 0,
    character: character1,
  };

  it('should hydrate coord', () => {

    const datas = Map({ 1: character1, 2: character2 });

    expect(CoordsTools.hydrater(jsonCoord, datas)).toEqual(coord);
  });

  it('should serialize coord', () => {
    expect(CoordsTools.serializer(coord)).toEqual(jsonCoord);
  });
});

// tslint:disable-next-line: no-big-function
describe('MapsTools', () => {

  const mockStore = configureStore();

  const defaultCharacterState = {
    agility: 1,
    bonusAgility: 0,
    bonusDexterity: 0,
    bonusHp: 0,
    bonusInsight: 0,
    bonusMagic: 0,
    bonusRegenAgility: 0,
    bonusRegenHp: 0,
    bonusRegenSpeed: 0,
    bonusSpeed: 0,
    bonusStrength: 0,
    buffs: [],
    currentAgility: 0,
    currentDexterity: 1,
    currentHp: 1,
    currentInsight: 1,
    currentMagic: 0,
    currentSpeed: 0,
    currentStrength: 1,
    dexterity: 1,
    ep: 0,
    grade: {
      major: 0,
      minor: 0,
    },
    hp: 1,
    insight: 1,
    levelAgility: 0,
    levelDexterity: 0,
    levelHp: 0,
    levelInsight: 0,
    levelMagic: 0,
    levelRegenAgility: 0,
    levelRegenHp: 0,
    levelRegenSpeed: 0,
    levelSpeed: 0,
    levelStrength: 0,
    magic: 0,
    malusAgility: 0,
    malusDexterity: 0,
    malusHp: 0,
    malusInsight: 0,
    malusMagic: 0,
    malusRegenAgility: 0,
    malusRegenHp: 0,
    malusRegenSpeed: 0,
    malusSpeed: 0,
    malusStrength: 0,
    maps: 'earth',
    mat: undefined,
    maxAgility: 1,
    maxHp: 1,
    maxRegenAgility: 1,
    maxRegenHp: 1,
    maxRegenSpeed: 1,
    maxSpeed: 1,
    modifAgility: 0,
    modifDexterity: 0,
    modifHp: 0,
    modifInsight: 0,
    modifMagic: 0,
    modifRegenAgility: 0,
    modifRegenHp: 0,
    modifRegenSpeed: 0,
    modifSpeed: 0,
    modifStrength: 0,
    motd: '',
    name: undefined,
    owner: 0,
    posture: 0,
    race: 'no',
    regenAgility: 1,
    regenHp: 1,
    regenSpeed: 1,
    speed: 1,
    strength: 1,
    xp: 0,
  };

  // tslint:disable-next-line: no-useless-cast
  const earth = Plans.first() as Plan;

  // IMapsState = Map<string, List<Coord>>;
  const initialState = {
    Maps: Map({
      earth: List([
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
    }),
  } as IStateServer;

  let store: Store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('coords from position', () => {
    const expected = {
      character: {
        ...defaultCharacterState,
        mat: 1,
        name: 'Test 1',
      },
      x: 0,
      y: 0,
    };
    const result = MapsTools.getCoordFromPosition(earth, 0, 0, store);
    expect(result).toEqual(expected);

    const expected2 = {
      character: {
        ...defaultCharacterState,
        mat: 2,
        name: 'Test 2',
      },
      x: 1,
      y: 0,
    };
    const result2 = MapsTools.getCoordFromPosition(earth, 1, 0, store);
    expect(result2).toEqual(expected2);

    const resultNull = MapsTools.getCoordFromPosition(earth, 0, 5, store);
    expect(resultNull).toBeNull();

    const planIsNull = MapsTools.getCoordFromPosition({ id: null } as Plan, 0, 0, store);
    expect(planIsNull).toBeNull();
  });

  it('get relative position', () => {

    // X = east-west position
    // Y = north-south
    const expectedNorth = { x: 0, y: -1 };
    const expectedSouth = { x: 0, y: 1 };
    const expectedWest = { x: -1, y: 0 };
    const expectedEast = { x: 1, y: 0 };

    const expectedNW = { x: -1, y: -1 };
    const expectedNE = { x: 1, y: -1 };
    const expectedSW = { x: -1, y: 1 };
    const expectedSE = { x: 1, y: 1 };

    const resultNorth = MapsTools.getRelativePosition(0, 0, Direction.North);

    const resultSouth = MapsTools.getRelativePosition(0, 0, Direction.South);

    const resultWest = MapsTools.getRelativePosition(0, 0, Direction.West);

    const resultEast = MapsTools.getRelativePosition(0, 0, Direction.East);

    const resultNW = MapsTools.getRelativePosition(0, 0, Direction.NorthWest);
    const resultNE = MapsTools.getRelativePosition(0, 0, Direction.NorthEast);
    const resultSW = MapsTools.getRelativePosition(0, 0, Direction.SouthWest);
    const resultSE = MapsTools.getRelativePosition(0, 0, Direction.SouthEast);

    const badDirectionResult = { x: 0, y: 0 };
    const badDirection = MapsTools.getRelativePosition(0, 0, -1 as Direction);

    expect(resultNorth).toEqual(expectedNorth);
    expect(resultSouth).toEqual(expectedSouth);
    expect(resultWest).toEqual(expectedWest);
    expect(resultEast).toEqual(expectedEast);

    expect(resultNW).toEqual(expectedNW);
    expect(resultNE).toEqual(expectedNE);
    expect(resultSW).toEqual(expectedSW);
    expect(resultSE).toEqual(expectedSE);

    expect(badDirection).toEqual(badDirectionResult);

  });

  it('should get coord in view', () => {

    const coord1 = { x: 4, y: 1 } as Coord; // in view
    const coord2 = { x: 0, y: 10 } as Coord; // y too far
    const coord3 = { x: 2, y: -1 } as Coord; // in view
    const coord4 = { x: 0, y: 0 } as Coord; // in view
    const coord5 = { x: 10, y: 0 } as Coord; // x too far
    const coord6 = { x: 10, y: 10 } as Coord; // too far

    const viewStore = mockStore({
      Maps: Map({
        earth: List<Coord>([
          coord1,
          coord2,
          coord3,
          coord4,
          coord5,
          coord6,
        ]),
      }),
    });
    // Map<string, List<Coord>>
    const result = MapsTools.getCoordsFromAroundPosition(coord4, earth, 8, viewStore);

    expect(result).toEqual(List([
      coord1,
      coord3,
      coord4,
    ]));

  });

});

describe('Maps reducers', () => {
  it('should return the initial state', () => {
    expect(mapsReducer(undefined, {} as any)).toEqual(Map());
  });

  it('should handle LOAD_DATABASE', () => {
    const response = Map({ jest: List([]) });

    (loadDatabaseMap as any).mockResolvedValue(response);

    const test: Promise<Map<string, List<any>>> = mapsReducer(undefined, loadDatabase(Map())) as any;

    test.then(resp => expect(resp).toEqual(response));

    expect(loadDatabaseMap).toBeCalled();
  });

  it('should handle SAVE_DATABASE', () => {

    mapsReducer(undefined, saveDatabase());
    expect(saveDatabaseMap).toBeCalled();
  });
});
