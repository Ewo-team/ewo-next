/**
 * @module Engine
 * Redux Actions
 */

import { linkToMap, loadDatabase as loadCharacters, saveDatabase as saveCharacters } from './Characters/actions';
import { loadDatabase as loadMaps, saveDatabase as saveMaps } from './Maps/actions';
import { IStateServer } from './reducers';
import { loadDatabase as loadUsers, saveDatabase as saveUsers } from './Users/actions';

export enum EngineActions {
  LOAD_DATABASE = 'EngineActions.LOAD_DATABASE',
  SAVE_DATABASE = 'EngineActions.SAVE_DATABASE',
}

export const loadDatabases = () => (dispatch, getState: () => IStateServer) => {
  console.log('loading all databases');
  dispatch(loadCharacters());
  dispatch(loadMaps(getState().Characters));
  dispatch(linkToMap(getState().Maps));
  dispatch(loadUsers());
};

export const saveDatabases = () => dispatch => {
  console.log('saving all databases');
  dispatch(saveCharacters());
  dispatch(saveMaps());
  dispatch(saveUsers());
};
