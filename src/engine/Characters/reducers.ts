import { Map } from 'immutable';
import { AnyAction } from 'redux';
import * as Tasks from '../tasks';
import { CharactersActions } from './actions';
import { Character, CharactersTools } from './Character';

const INITIAL_STATE: ICharactersState = Map();
const DATABASE = 'characters';

export type ICharactersState = Map<string, Character>;

export const charactersReducer = (state: ICharactersState = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case CharactersActions.LOAD_DATABASE:
      const load = Tasks.loadDatabaseMap({ databaseName: DATABASE, modelHydrater: CharactersTools.hydrater }) as ICharactersState;
      return load;
    case CharactersActions.SAVE_DATABASE:
      Tasks.saveDatabaseMap(DATABASE, state);
      return state;
    default:
      return state;
  }
};
