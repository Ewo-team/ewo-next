import { List } from 'immutable';

export function initDatabase(state, entries) {
  return state.set('entries', List(entries));
}
