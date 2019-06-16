import { combineReducers } from 'redux';
import { charactersReducer, ICharactersState } from './Characters/reducers';
import { IMapsState, mapsReducer } from './Maps/reducers';
import { IUsersState, usersReducers } from './Users/reducers';

export interface IState {
  Characters: ICharactersState;
  Maps: IMapsState;
  Users: IUsersState;
}

export const rootReducer = combineReducers({
  Characters: charactersReducer,
  Maps: mapsReducer,
  Users: usersReducers,
});
