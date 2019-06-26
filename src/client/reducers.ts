import { Character, CoordFrontend } from '@models';
import { AnyAction } from 'redux';
import { Actions } from './actions';

export interface IStateFrontend {
  selectedCharacter?: number;
  characters: Record<string, Character>;
  coords: Record<string, CoordFrontend[]>;
  loaded: boolean;
  loading: boolean;
  error?: string;
}

const initialState: IStateFrontend = {
  loading: false,
  loaded: false,
  characters: {},
  coords: {},
};

const reducer = (state: IStateFrontend = initialState, action: AnyAction): IStateFrontend => {
  switch (action.type) {
    case Actions.REFRESH_CHARACTERS:
      return { ...state, loading: false, loaded: true, characters: action.characters };
    case Actions.REFRESH_MAPS:
      return { ...state, loading: false, loaded: true, coords: { ...state.coords, [action.mat]: action.coords } };
    case Actions.SET_SELECTED_CHARACTER:
      return { ...state, selectedCharacter: action.mat };
  }

  return state;
};

export default reducer;
