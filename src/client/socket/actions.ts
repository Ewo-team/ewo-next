/**
 * @module Client.Socket
 * Socket.IO Client
 * @preferred
 */

import { CommandList } from '@engine/Commands/Command';
import { Direction } from '@models';
import { Actions } from '../actions';

export const socketActionMovement = (mat: number, movement: Direction) => ({
  type: Actions.SOCKET_ACTION,
  payload: {
    action: CommandList.move,
    mat,
    movement,
  },
});

export const socketActionMovements = (mat: number, movements: Direction[]) => ({
  type: Actions.SOCKET_ACTIONS,
  payload: {
    action: CommandList.move,
    mat,
    movements,
  },
});

export const socketUpdateMotd = (mat: number, message: string) => ({
  type: Actions.SOCKET_UPDATE,
  payload: {
    action: CommandList.motd,
    mat,
    message,
  },
});
