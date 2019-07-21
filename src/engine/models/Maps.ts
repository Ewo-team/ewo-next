/**
 * @module Engine.Models
 * Map, Plan and Coord
 */

import { Character } from '@models';
import { CharacterFrontend, CharacterLimitedFrontend } from './Character/Character';

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

export enum POVState {
  Fog,
  Block,
}

export interface CoordDatabase {
  x: number;
  y: number;
  mat: number;
}

export interface CoordFrontend {
  x: number;
  y: number;
  type: 'cha' | 'pov' | 'env' | 'lab' | 'met';
}

export interface CoordCharacterFrontend extends CoordFrontend {
  character: CharacterFrontend | CharacterLimitedFrontend;
}

export interface CoordPovFrontend extends CoordFrontend {
  state: POVState;
}

export interface CoordEnvironmentFrontend extends CoordFrontend {
  tile: number;
  layer: number;
}

export interface ViewFrontend {
  characters: CoordCharacterFrontend[];
  pov: CoordPovFrontend[];
  map?: string;
}

/**
 * RAW map definition
 */
export interface RawMap {
  block: number[][];
  meta: MapMeta[][];
  tiles: {[key: number]: number}[][];
}

export interface MapMeta {
  cost?: number;
  block?: boolean;
}
