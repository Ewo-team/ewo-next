
export interface Coord {
  x: number;
  y: number;
  mat: number;
}

export namespace CoordsTools {
  export const hydrater = (source: any): Coord => {
    console.log(`hydrating (${source.x}, ${source.y}, ${source.mat})`);
    return {
      x: source.x,
      y: source.y,
      mat: source.mat,
    };
  };
}
