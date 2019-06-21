import { IMapsState } from '@engine/Maps/reducers';
import { Plans } from '@engine/resources';
import { Character } from '@models';
import * as Tasks from '@tasks';
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
    case CharactersActions.LINK_TO_MAP:
      const maps: IMapsState = action.maps;

      return state.map(character => {

        const map = maps.get(character.maps);

        const plan = Plans.find(p => p.id === character.maps);

        const coord = map.find(m => m.character.mat === character.mat);

        return {
          ...character, position: {
            plan,
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
    // case CharacterActions.MOVE:
    /*return state.update(action.maps, (map) => {
      const coordIndex = map.findIndex(c => c.mat === action.character.mat);
      return map.update(coordIndex, (coord) => {
        coord.x = action.newX;
        coord.y = action.newY;
        return coord;
      });
    });*/
    default:
      return state;
  }
};
