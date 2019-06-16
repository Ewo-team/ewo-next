import { loadDatabase as loadCharacters, saveDatabase as saveCharacters } from './Characters/actions';
import { loadDatabase as loadMaps, saveDatabase as saveMaps } from './Maps/actions';
import { loadDatabase as loadUsers, saveDatabase as saveUsers } from './Users/actions';

export enum EngineActions {
  LOAD_DATABASE = 'EngineActions.LOAD_DATABASE',
  SAVE_DATABASE = 'EngineActions.SAVE_DATABASE',
}

export const loadDatabases = () => dispatch => {
  console.log('loading all databases');
  dispatch(loadCharacters());
  dispatch(loadMaps());
  dispatch(loadUsers());
};

export const saveDatabases = () => dispatch => {
  console.log('saving all databases');
  dispatch(saveCharacters());
  dispatch(saveMaps());
  dispatch(saveUsers());
};
