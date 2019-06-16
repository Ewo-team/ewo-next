import { User } from './User';

export enum UsersActions {
  REGISTER = 'UsersActions.REGISTER',
  LOGIN = 'UsersActions.LOGIN',
  LOGOUT = 'UsersActions.LOGOUT',
  LOAD_DATABASE = 'UsersActions.LOAD_DATABASE',
  SAVE_DATABASE = 'UsersActions.SAVE_DATABASE',
}

export const register = (user: User) => ({
  type: UsersActions.REGISTER,
  user,
});

export const login = (username: string, token: string) => ({
  type: UsersActions.LOGIN,
  username,
  token,
});

export const logout = (token) => ({
  type: UsersActions.LOGOUT,
  token,
});

export const loadDatabase = () => ({
  type: UsersActions.LOAD_DATABASE,
});

export const saveDatabase = () => ({
  type: UsersActions.SAVE_DATABASE,
});
