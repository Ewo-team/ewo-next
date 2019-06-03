import { List, Map } from 'immutable';
import { AnyAction } from 'redux';
import * as Tasks from '../tasks';
import { MapsActions } from './actions';
import { Coord, coordHydrater } from './Coord';

const INITIAL_STATE: IMapsState = Map();
const DATABASE = 'maps';

export type IMapsState = Map<string, List<Coord>>;

export const reducer = (state: IMapsState = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case MapsActions.LOAD_DATABASE:
      const load = Tasks.loadDatabaseMap({ databaseName: DATABASE, modelHydrater: coordHydrater }) as IMapsState;
      return load;
    case MapsActions.SAVE_DATABASE:
      Tasks.saveDatabaseMap(DATABASE, state);
    case MapsActions.MOVE:
      return state.update(action.maps, (map) => {
        const coordIndex = map.findIndex(c => c.mat === action.Character.mat);
        return map.update(coordIndex, (coord) => {
          coord.x = action.newX;
          coord.y = action.newY;
          return coord;
        });
      });
    default:
      return state;
  }
};
