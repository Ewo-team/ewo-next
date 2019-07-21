/**
 * @module Engine.Models
 * User
 */

export interface User {
  id: number;
  name: string;
  hash: string;
  email: string;
  token?: string; // Token for socket.io
  role?: UserRole;
}

export enum UserRole {
  NonValidated = 0,
  User = 1,
  AntiCheat = 10,
  Admin = 20,
}
