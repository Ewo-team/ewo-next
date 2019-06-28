/**
 * @module Engine.Maps
 * Maps reducers
 */

import * as Tasks from '@engine/Commands/tasks';
import { Coord } from '@models';
import { List, Map } from 'immutable';
import { AnyAction } from 'redux';
import { MapsActions } from './actions';
import { CoordsTools } from './CoordsTools';

// tslint:disable-next-line: no-unnecessary-type-annotation
const INITIAL_STATE: IMapsState = Map();
const DATABASE = 'maps';

export type IMapsState = Map<string, List<Coord>>;

export const mapsReducer = (state: IMapsState = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case MapsActions.LOAD_DATABASE:
      return Tasks.loadDatabaseMap(DATABASE, CoordsTools.hydrater, action.characters);
    case MapsActions.SAVE_DATABASE:
      Tasks.saveDatabaseMap(DATABASE, state, CoordsTools.serializer);
    default:
      return state;
  }
};
