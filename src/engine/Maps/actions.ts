import { ICharactersState } from '@engine/Characters/reducers';

export enum MapsActions {
  LOAD_DATABASE = 'MapsActions.LOAD_DATABASE',
  SAVE_DATABASE = 'MapsActions.SAVE_DATABASE',
}

export const loadDatabase = (characters: ICharactersState) => ({
  type: MapsActions.LOAD_DATABASE,
  characters,
});

export const saveDatabase = () => ({
  type: MapsActions.SAVE_DATABASE,
});
