import { ICharactersState } from '@engine/Characters/reducers';
import { Coord } from '@models';

export class CoordsTools {
  public static hydrater = (source: any, additionnalData: ICharactersState): Coord => {

    const character = additionnalData.find(c => c.mat === source.mat);

    return {
      x: source.x,
      y: source.y,
      character,
    };
  }

  public static serializer = (source: Coord): any => {
    return {
      x: source.x,
      y: source.y,
      mat: source.character.mat,
    };
  }
}
