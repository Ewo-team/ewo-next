/// <reference types="jest" />

import { CharactersTools } from '@engine/Characters/CharacterTools';
import { addLazyCommand } from '@engine/Commands/CommandsTools';
import { User } from '@models';
import { List, Map } from 'immutable';
import configureStore from 'redux-mock-store';
import { loadDatabaseList, saveDatabaseList } from '../Commands/tasks';
import { loadDatabase, login, logout, register, saveDatabase, UsersActions } from './actions';
import { usersReducers } from './reducers';
import { UsersTools } from './UsersTools';

jest.mock('../Commands/tasks');
jest.mock('@engine/Commands/CommandsTools');

const partialUser = {
  email: 'email',
  hash: 'hash',
  name: 'jest',
} as User;

const mockStore = configureStore();

describe('Users actions', () => {

  it('should create an action to register', () => {
    const expectedAction = {
      type: UsersActions.REGISTER,
      user: partialUser,
    };
    expect(register(partialUser)).toEqual(expectedAction);
  });

  it('should create an action to login', () => {
    const expectedAction = {
      type: UsersActions.LOGIN,
      username: partialUser.name,
      token: '1234',
    };
    expect(login(partialUser.name, '1234')).toEqual(expectedAction);
  });

  it('should create an action to logout', () => {
    const expectedAction = {
      type: UsersActions.LOGOUT,
      token: '1234',
    };
    expect(logout('1234')).toEqual(expectedAction);
  });

  it('should create an action to load database', () => {
    const expectedAction = {
      type: UsersActions.LOAD_DATABASE,
    };
    expect(loadDatabase()).toEqual(expectedAction);
  });

  it('should create an action to save database', () => {
    const expectedAction = {
      type: UsersActions.SAVE_DATABASE,
    };
    expect(saveDatabase()).toEqual(expectedAction);
  });
});

describe('Users reducers', () => {

  const user: User = {
    ...partialUser,
    id: 0,
  };

  const state = List([]);

  it('should return the initial state', () => {
    expect(usersReducers(undefined, {} as any)).toEqual(List());
  });

  it('should handle REGISTER', () => {
    expect(usersReducers(state, register(partialUser))).toEqual(List([user]));
    expect(addLazyCommand).toBeCalled();
  });

  it('should handle LOGIN', () => {
    const logged = { ...user, token: '1234' };
    expect(usersReducers(List([user]), login(partialUser.name, '1234'))).toEqual(List([logged]));
  });

  it('should handle LOGOUT', () => {
    const stateExpected = List([
      user,
      { ...user, mat: 2, token: '4567' },
    ]);
    const stateInitial = List([
      { ...user, token: '1234' },
      { ...user, mat: 2, token: '4567' },
    ]);

    expect(usersReducers(stateInitial, logout('1234'))).toEqual(stateExpected);
  });

  it('should handle LOAD_DATABASE', () => {
    const response = List([]);

    (loadDatabaseList as any).mockResolvedValue(response);

    const test: Promise<List<any>> = usersReducers(undefined, loadDatabase()) as any;

    test.then(resp => expect(resp).toEqual(response));

    expect(loadDatabaseList).toBeCalled();
  });

  it('should handle SAVE_DATABASE', () => {

    usersReducers(undefined, saveDatabase());
    expect(saveDatabaseList).toBeCalled();
  });
});

describe('UsersTools', () => {

  const jsonUser = JSON.parse('{"id": 0,"name": "jest","hash": "hash","email": "email"}');
  const jsonUserInvalid = JSON.parse('{"id": 0,"name": "jest","hash": "hash","email": "email", "invalid-prop": "invalid-value"}');
  const jsonUserMissing1 = JSON.parse('{"id": 0,"name": "jest"}');
  const jsonUserMissing2 = JSON.parse('{"hash": "hash","email": "email"}');

  const user = {
    id: 0,
    name: 'jest',
    hash: 'hash',
    email: 'email',
  };

  const userMissing1 = {
    id: 0,
    name: 'jest',
    hash: null,
    email: null,
  };

  const userMissing2 = {
    id: null,
    name: null,
    hash: 'hash',
    email: 'email',
  };

  it('should hydrate user', () => {
    expect(UsersTools.hydrater(jsonUser)).toEqual(user);
    expect(UsersTools.hydrater(jsonUserInvalid)).toEqual(user);
    expect(UsersTools.hydrater(jsonUserMissing1)).toEqual(userMissing1);
    expect(UsersTools.hydrater(jsonUserMissing2)).toEqual(userMissing2);
  });

  it('should serialize coord', () => {
    const invalidUser = {
      ...user,
      invalidProps: 'invalid value',
    } as User;

    expect(UsersTools.serializer(user)).toEqual(jsonUser);
    expect(UsersTools.serializer(invalidUser)).toEqual(jsonUser);
    expect(UsersTools.serializer(userMissing1)).toEqual(jsonUserMissing1);
    expect(UsersTools.serializer(userMissing2)).toEqual(jsonUserMissing2);
  });

  it('should get user mats', () => {

    const character1 = CharactersTools.factory(1, 'Test 1', { owner: 1 });
    const character2 = CharactersTools.factory(2, 'Test 2', { owner: 2 });
    const character3 = CharactersTools.factory(3, 'Test 3', { owner: 1 });

    const characters = Map({
      1: character1,
      2: character2,
      3: character3,
    });

    const store = mockStore({
      Characters: characters,
    });

    expect(UsersTools.ownedChar(store, { id: 1 } as any)).toEqual([1, 3]);
    expect(UsersTools.ownedChar(store, { id: 2 } as any)).toEqual([2]);
    expect(UsersTools.ownedChar(store, { id: 3 } as any)).toEqual([]);

  });
});
