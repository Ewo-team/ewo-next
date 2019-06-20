import * as Tasks from '@commands/tasks';
import { CharacterActions } from '@engine/Characters/actions';
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
      const load = Tasks.loadDatabaseMap({ databaseName: DATABASE, modelHydrater: CoordsTools.hydrater }) as IMapsState;
      return load;
    case MapsActions.SAVE_DATABASE:
      Tasks.saveDatabaseMap(DATABASE, state);
    case CharacterActions.MOVE:
      return state.update(action.maps, (map) => {
        const coordIndex = map.findIndex(c => c.mat === action.character.mat);
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
