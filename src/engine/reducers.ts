import { combineReducers } from 'redux';
import { ICharactersState, reducer as CharactersReducers } from './Characters/reducers';
import { IMapsState, reducer as MapsReducers } from './Maps/reducers';

// import { IMapsState } from './store';

export interface IState {
  Characters: ICharactersState,
  Maps: IMapsState;
}

export const rootReducer = combineReducers({
  Characters: CharactersReducers,
  Maps: MapsReducers,
});
