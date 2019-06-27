import { CharacterStates } from '@models';

export interface Buff {
  type: 'perm' | 'temp';
  operation: 'bonus' | 'malus';
  state: CharacterStates;
  regenState?: CharacterStates;
  value: number;
}
