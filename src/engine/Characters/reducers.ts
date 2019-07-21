/**
 * @module Engine.Characters
 * Characters reducers
 */

import * as Tasks from '@engine/Commands/tasks';
import { IMapsState } from '@engine/Maps/reducers';
import { Character, CharacterFrontend, CharacterDatabase } from '@models';
import { Map } from 'immutable';
import { AnyAction } from 'redux';
import { CharacterActions, CharactersActions } from './actions';
import { CharactersTools } from './CharacterTools';
import { Plans } from '@engine/resources';

// tslint:disable-next-line: no-unnecessary-type-annotation
const INITIAL_STATE: ICharactersState = Map();
const DATABASE = 'characters';

export type ICharactersState = Map<string, Character>;

export const charactersReducer = (state: ICharactersState = INITIAL_STATE, action: AnyAction): ICharactersState => {
  switch (action.type) {
    case CharactersActions.LOAD_DATABASE:
      return Tasks.loadDatabaseMap(DATABASE, CharactersTools.factory);
    case CharactersActions.SAVE_DATABASE:
      Tasks.saveDatabaseMap(DATABASE, state);
      return state;
    case CharactersActions.LINK_TO_MAP:
      const maps: IMapsState = action.maps;

      // Technically, we can threat
      return state.map(character => {

        if (character.position === undefined || character.position.plan === undefined) {
          return character;
        }
        const map = maps.get(character.position.plan.id);

        const coord = map.find(m => m.character.mat === character.mat);

        return {
          ...character, position: {
            plan: character.position.plan,
            coord,
          },
        };
      });

    case CharacterActions.MOVE:
      const char: Character = action.character;
      char.currentSpeed -= action.cost;

      char.position.coord.x = action.newX;
      char.position.coord.y = action.newY;

      return state.set(String(char.mat), char);
    case CharacterActions.CREATE:
      const newChar = CharactersTools.factory({ mat: state.size + 1, name: action.name, race: action.race, owner: action.owner, genre: action.genre });

      return state.set(String(newChar.mat), newChar);

    default:
      return state;
  }
};
