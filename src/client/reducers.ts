import { Character } from '@models';
import { AnyAction } from 'redux';
import { Actions } from './actions';

export interface IStateFrontend {
  selectedCharacter?: number;
  characters: Character[];
  loaded: boolean;
  loading: boolean;
  error?: string;
}

const initialState: IStateFrontend = {
  loading: false,
  loaded: false,
  characters: [],
};

const reducer = (state: IStateFrontend = initialState, action: AnyAction): IStateFrontend => {
  switch (action.type) {
    case Actions.LOAD_INIT:
      return { loading: true, loaded: false, characters: [] };
    case Actions.LOAD_SUCCESS:
      return { loading: false, loaded: true, characters: action.characters };
    case Actions.LOAD_ERROR:
      return { loading: false, loaded: false, characters: [], error: action.error };
    case Actions.SET_SELECTED_CHARACTER:
      return { ...state, selectedCharacter: action.mat };
  }

  return state;
};

export default reducer;
