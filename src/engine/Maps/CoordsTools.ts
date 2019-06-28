/**
 * @module Engine.Maps
 * Coords Tools
 */
import { ICharactersState } from '@engine/Characters/reducers';
import { Coord } from '@models';

export class CoordsTools {
  public static hydrater = (source: any, additionnalData: ICharactersState): Coord => {

    const character = additionnalData.find(c => c.mat === source.mat);

    return {
      x: source.x !== undefined ? source.x : null,
      y: source.y !== undefined ? source.y : null,
      character: character !== undefined ? character : null,
    };
  }

  public static serializer = (source: Coord): any => {

    const coordJson: any = {};

    if (source.x !== null) {
      coordJson.x = source.x;
    }

    if (source.y !== null) {
      coordJson.y = source.y;
    }

    if (source.character !== null) {
      coordJson.mat = source.character.mat;
    }

    return coordJson;
  }
}
