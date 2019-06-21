import * as Tasks from '@engine/tasks';
import { Coord } from '@models';
import { List, Map } from 'immutable';
import { AnyAction } from 'redux';
import { MapsActions } from './actions';
import { CoordsTools } from './CoordsTools';

const INITIAL_STATE: IMapsState = Map();
const DATABASE = 'maps';

export type IMapsState = Map<string, List<Coord>>;

export const mapsReducer = (state: IMapsState = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case MapsActions.LOAD_DATABASE:
      const load = Tasks.loadDatabaseMap({ databaseName: DATABASE, modelHydrater: CoordsTools.hydrater, additionnalData: action.characters }) as IMapsState;
      return load;
    case MapsActions.SAVE_DATABASE:
      Tasks.saveDatabaseMap(DATABASE, state, CoordsTools.serializer);
    default:
      return state;
  }
};
