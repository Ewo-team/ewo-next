/// <reference types="jest" />

import { CharactersTools } from '@engine/Characters/CharacterTools';
import { IStateServer } from '@engine/reducers';
import { Plans } from '@engine/resources';
import mapDemo from '@engine/resources/maps/map_demo';
import { Coord, Direction, Plan } from '@models';
import { List, Map } from 'immutable';
import { Store } from 'redux';
import configureStore from 'redux-mock-store';
import { loadDatabaseMap, saveDatabaseMap } from '../Commands/tasks';
import { loadDatabase, MapsActions, saveDatabase } from './actions';
import { CoordsTools } from './CoordsTools';
import { MapsTools } from './MapsTools';
import { POV } from './POV/POV';
import { mapsReducer } from './reducers';

jest.mock('../Commands/tasks');

const character1 = CharactersTools.factory({ mat: 1, name: 'Test 1' });
const character2 = CharactersTools.factory({ mat: 2, name: 'Test 2' });

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
  const jsonCoordInvalid1 = JSON.parse('{"x": 0,"y": 0,"mat": 1,"invalid-prop":"invalid-value"}');
  const jsonCoordInvalid2 = JSON.parse('{"x": 0,"y": 0,"mat": 3}');
  const jsonCoordMissing1 = JSON.parse('{"x": 0,"y": 0}');
  const jsonCoordMissing2 = JSON.parse('{"mat": 1}');
  const coord = {
    x: 0,
    y: 0,
    character: character1,
  };

  const coordMissing1 = {
    x: 0,
    y: 0,
    character: null,
  };

  const coordMissing2 = {
    x: null,
    y: null,
    character: character1,
  };

  it('should hydrate coord', () => {

    const datas = Map({ 1: character1, 2: character2 });

    expect(CoordsTools.hydrater(jsonCoord, datas)).toEqual(coord);
    expect(CoordsTools.hydrater(jsonCoordInvalid1, datas)).toEqual(coord);
    expect(CoordsTools.hydrater(jsonCoordInvalid2, datas)).toEqual(coordMissing1);
    expect(CoordsTools.hydrater(jsonCoordMissing1, datas)).toEqual(coordMissing1);
    expect(CoordsTools.hydrater(jsonCoordMissing2, datas)).toEqual(coordMissing2);
  });

  it('should serialize coord', () => {
    const invalidCoord = {
      ...coord,
      invalidProps: 'invalid value',
    } as Coord;

    expect(CoordsTools.serializer(coord)).toEqual(jsonCoord);
    expect(CoordsTools.serializer(invalidCoord)).toEqual(jsonCoord);
    expect(CoordsTools.serializer(coordMissing1)).toEqual(jsonCoordMissing1);
    expect(CoordsTools.serializer(coordMissing2)).toEqual(jsonCoordMissing2);
  });
});

// tslint:disable-next-line: no-big-function
describe('MapsTools', () => {

  const mockStore = configureStore();

  // tslint:disable-next-line: no-useless-cast
  const althian = Plans.althian;

  // IMapsState = Map<string, List<Coord>>;
  const initialState = {
    Maps: Map({
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
    }),
  } as IStateServer;

  let store: Store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('coords from position', () => {
    const expected = {
      character: {
        mat: 1,
        name: 'Test 1',
      },
      x: 0,
      y: 0,
    };
    const result = MapsTools.getCoordFromPosition(althian, 0, 0, store);
    expect(result).toMatchObject(expected);

    const expected2 = {
      character: {
        mat: 2,
        name: 'Test 2',
      },
      x: 1,
      y: 0,
    };
    const result2 = MapsTools.getCoordFromPosition(althian, 1, 0, store);
    expect(result2).toMatchObject(expected2);

    const resultNull = MapsTools.getCoordFromPosition(althian, 0, 5, store);
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
        althian: List<Coord>([
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
    const result = MapsTools.getCoordsFromAroundPosition(coord4.x, coord4.y, althian.id, 8, viewStore);

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

describe('Map Demo', () => {
  it('should have block and meta section', () => {
    expect(mapDemo.block).not.toBeUndefined();
    expect(mapDemo.meta).not.toBeUndefined();
  });

  it('should have correct grid size', () => {
    expect(mapDemo.block.length).toEqual(100);
    expect(mapDemo.meta.length).toEqual(100);

    expect(mapDemo.block[0].length).toEqual(100);
    expect(mapDemo.meta[0].length).toEqual(100);
  });

  it('should have contain only numbers (block grid)', () => {

    let invalid = 0;
    mapDemo.block.forEach(l => l.forEach(c => {
      if (c !== 1 && c !== 0) {
        invalid += 1;
      }
    },
    ));

    expect(invalid).toEqual(0);

  });

  it('should have contain only null or valid meta (meta grid)', () => {

    let invalid = 0;

    mapDemo.meta.forEach(l => l.forEach(c => {
      if (!(c === null ||
        (!c.cost || c.cost !== 1))) {
        invalid += 1;
      }
    }));

    expect(invalid).toEqual(0);

  });
});

describe('Map POV generator', () => {
  it('should generate a POV correctly', () => {
    const rays1 = POV.generatePOV(2);

    expect(rays1.length).toEqual(8);
  });

  it('should generate a POV correctly (range 2 to 30)', () => {
    const expected = [];
    const results = [];
    for (let range = 2; range <= 30; range += 1) {
      results.push(POV.generatePOV(range).length);
      expected.push(Math.floor(range / 2) * 8);
    }

    expect(expected).toEqual(results);

  });
});
