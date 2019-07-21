/**
 * @module Client.Redux
 * Application Redux items
 * @preferred
 */

import { CharacterFrontend, ViewFrontend } from '@models';
import { AnyAction } from 'redux';
import { Actions } from './actions';

export interface IStateFrontend {
  selectedCharacter?: number;
  characters: Record<string, CharacterFrontend>;
  views: Record<string, ViewFrontend>;
  loaded: boolean;
  loading: boolean;
  error?: string;
}

const initialState: IStateFrontend = {
  loading: false,
  loaded: false,
  characters: {},
  views: {},
};

const reducer = (state: IStateFrontend = initialState, action: AnyAction): IStateFrontend => {
  switch (action.type) {
    case Actions.REFRESH_CHARACTERS:
      return { ...state, loading: false, loaded: true, characters: action.characters };
    case Actions.REFRESH_MAPS:
      return { ...state, loading: false, loaded: true, views: { ...state.views, [action.mat]: action.views } };
    case Actions.SET_SELECTED_CHARACTER:
      return { ...state, selectedCharacter: action.mat };
  }

  return state;
};

export default reducer;
