import { Character } from '@models';

export interface Plan {
  id: string;
  name: string;
}

export interface Coord {
  x: number;
  y: number;
  character: Character;
}

export interface CoordFrontend {
  x: number;
  y: number;
  mat: number;
}
