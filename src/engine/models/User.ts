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
}
