import { List, Map } from 'immutable';
import { initDatabase } from './core';

describe('application logic', () => {

  describe('initDatabase', () => {

    it('adds the entries to the state', () => {
      const state = Map();
      const entries = List.of('Trainspotting', '28 Days Later');
      const nextState = initDatabase(state, entries);
      expect(nextState).toEqual(Map({
        entries: List.of('Trainspotting', '28 Days Later'),
      }));
    });

  });

});
