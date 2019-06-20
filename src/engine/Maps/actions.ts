export enum MapsActions {
  LOAD_DATABASE = 'MapsActions.LOAD_DATABASE',
  SAVE_DATABASE = 'MapsActions.SAVE_DATABASE',
}

export const loadDatabase = () => ({
  type: MapsActions.LOAD_DATABASE,
});

export const saveDatabase = () => ({
  type: MapsActions.SAVE_DATABASE,
});
