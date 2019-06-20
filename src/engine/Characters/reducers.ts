import * as Tasks from '@commands/tasks';
import { Character } from '@models';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { CharacterActions, CharactersActions } from './actions';
import { CharactersTools } from './CharacterTools';

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
    case CharacterActions.MOVE:
      const char = action.character;
      char.speedPoints -= action.cost;

      return state.set(char.mat, char);

    default:
      return state;
  }
};
