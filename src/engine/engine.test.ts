/// <reference types="jest" />
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { loadDatabases, saveDatabases } from './actions';
import { CharactersActions } from './Characters/actions';
import { MapsActions } from './Maps/actions';
import { UsersActions } from './Users/actions';

const createMockStore = configureMockStore([thunk]);

describe('Engine actions', () => {
  it('should dispatch actions to load database', () => {
    // Arrange.
    const expectedActions = [
      { type: CharactersActions.LOAD_DATABASE },
      { characters: undefined, type: MapsActions.LOAD_DATABASE },
      { maps: undefined, type: CharactersActions.LINK_TO_MAP },
      { type: UsersActions.LOAD_DATABASE },
    ];

    const store = createMockStore({});

    // Act.
    store.dispatch(loadDatabases());

    // Assert.
    const dispatchedActions = store.getActions();
    expect(dispatchedActions).toEqual(expectedActions);
  });

  it('should dispatch actions to save database', () => {
    // Arrange.
    const expectedActions = [
      { type: CharactersActions.SAVE_DATABASE },
      { type: MapsActions.SAVE_DATABASE },
      { type: UsersActions.SAVE_DATABASE },
    ];

    const store = createMockStore({});

    // Act.
    store.dispatch(saveDatabases());

    // Assert.
    const dispatchedActions = store.getActions();
    expect(dispatchedActions).toEqual(expectedActions);
  });
});