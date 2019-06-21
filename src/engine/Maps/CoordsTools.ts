import { ICharactersState } from '@engine/Characters/reducers';
import { Coord } from '@models';

export namespace CoordsTools {
  export const hydrater = (source: any, additionnalData: ICharactersState): Coord => {

    const character = additionnalData.find(c => c.mat === source.mat);

    return {
      x: source.x,
      y: source.y,
      character,
    };
  };

  export const serializer = (source: Coord): any => {
    return {
      x: source.x,
      y: source.y,
      mat: source.character.mat,
    };
  };
}
