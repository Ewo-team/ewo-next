/**
 * @module Engine.Resources
 * Resources for Maps
 */

import { Plan } from '@models';
import { List } from 'immutable';

export const Plans = List<Plan>([
  { id: 'earth', name: 'Althian' },
  { id: 'hell', name: 'Ciféris' },
  { id: 'heaven', name: 'Célestia' },
]);
