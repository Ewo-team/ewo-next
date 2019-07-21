/**
 * @module Engine.Resources
 * Resources for Maps
 */

import { Plan } from '@models';

export const Althian: Plan = { id: 'althian', name: 'Althian', rawMapName: 'map_demo' };
export const Ciferis: Plan = { id: 'ciferis', name: 'Ciféris', rawMapName: 'map_demo' };
export const Celestia: Plan = { id: 'celestia', name: 'Célestia', rawMapName: 'map_demo' };

export const Plans = {
  althian: Althian,
  ciferis: Ciferis,
  celestia: Celestia,
};
