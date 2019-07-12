/**
 * @module Engine.Models
 * Map, Plan and Coord
 */

import { Character } from '@models';

export interface Plan {
  id: string;
  name: string;
  rawMapName: string;
}

export interface Coord {
  x: number;
  y: number;
  character: Character;
}

export interface CoordFrontend {
  x: number;
  y: number;
  mat?: number;
  label?: string;
  type?: string;
  meta?: any;
  ui?: string;
}

/**
 * RAW map definition
 */
export interface RawMap {
  block: number[][];
  meta: MapMeta[][];
}

export interface MapMeta {
  cost?: number;
  block?: boolean;
}
