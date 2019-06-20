import { Character } from '@models';
import { AnyAction } from 'redux';
import { Actions } from './actions';

export interface IStateFrontend {
  selectedCharacter?: number;
  characters: Character[];
  loading: boolean;
  error?: string;
}

const initialState: IStateFrontend = {
  loading: false,
  characters: []
};

const reducer = (state: IStateFrontend = initialState, action: AnyAction): IStateFrontend => {
  switch (action.type) {
    case Actions.LOAD_INIT:
      return { loading: true, characters: [] };
    case Actions.LOAD_SUCCESS:
      return { loading: false, characters: action.characters };
    case Actions.LOAD_ERROR:
      return { loading: false, characters: [], error: action.error };
  }

  return state;
};

export default reducer;
