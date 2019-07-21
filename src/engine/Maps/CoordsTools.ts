/**
 * @module Engine.Maps
 * Coords Tools
 */
import { CharactersTools } from '@engine/Characters/CharacterTools';
import { ICharactersState } from '@engine/Characters/reducers';
import { Coord, CoordCharacterFrontend, CoordDatabase } from '@models';

export class CoordsTools {
  public static hydrater = (source: CoordDatabase, additionnalData: ICharactersState): Coord => {

    const character = additionnalData.find(c => c.mat === source.mat);

    return {
      x: source.x !== undefined ? source.x : null,
      y: source.y !== undefined ? source.y : null,
      character: character !== undefined ? character : null,
    };
  }

  public static serializer = (source: Coord): CoordDatabase => {

    const coordJson: Partial<CoordDatabase> = {};

    if (source.x !== null) {
      coordJson.x = source.x;
    }

    if (source.y !== null) {
      coordJson.y = source.y;
    }

    if (source.character !== null) {
      coordJson.mat = source.character.mat;
    }

    return coordJson as CoordDatabase;
  }

  public static toFrontend = (source: Coord): CoordCharacterFrontend => {

    const character = CharactersTools.toFrontEnd(source.character);

    return {
      x: source.x,
      y: source.y,
      character,
      type: 'cha',
    };
  }

  public static toFrontendLimited = (source: Coord): CoordCharacterFrontend => {

    const character = CharactersTools.toFrontEndLimited(source.character);

    return {
      x: source.x,
      y: source.y,
      character,
      type: 'cha',
    };
  }
}
