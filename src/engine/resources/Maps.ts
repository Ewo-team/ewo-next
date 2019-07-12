/**
 * @module Engine.Resources
 * Resources for Maps
 */

import { Plan } from '@models';
import { List } from 'immutable';

export const Plans = List<Plan>([
  { id: 'earth', name: 'Althian', rawMapName: 'map_demo' },
  { id: 'hell', name: 'Ciféris', rawMapName: 'map_demo' },
  { id: 'heaven', name: 'Célestia', rawMapName: 'map_demo' },
]);
