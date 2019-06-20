import { Coord } from '@models';

export namespace CoordsTools {
  export const hydrater = (source: any): Coord => {
    return {
      x: source.x,
      y: source.y,
      mat: source.mat,
    };
  };
}
