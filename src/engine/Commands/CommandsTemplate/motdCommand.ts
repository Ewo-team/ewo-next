/**
 * @module Engine.Commands.Templates
 * Update the Motd
 */

import { updateMotd } from '@engine/Characters/actions';
import { CharactersTools } from '@engine/Characters/CharacterTools';
import { Character } from '@models';
import validator from 'validator';
import { Command, CommandList, CommandStatus } from '../Command';

export interface MotdPayload {
  mat: number;
  message: string;
}

export interface MotdMeta {
  Character: Character;
  message: string;
}

export class MotdCommand implements Command {
  public readonly command = CommandList.motd;
  public readonly payload: MotdPayload;
  public status: CommandStatus;
  public callback;

  constructor(payload: MotdPayload) {
    this.payload = payload;
  }

  public eligible(payload: MotdPayload, store) {

    // get the current character
    const currentCharacter = CharactersTools.currentCharacter(payload.mat, store);

    if (currentCharacter === null) {
      return false;
    }

    return true;
  }

  public execute(meta: MotdMeta) {
    let message = validator.escape(meta.message);
    message = validator.ltrim(message, 180);
    this.callback = () => {
      console.log(message);
    };
    return [updateMotd(meta.Character, message)];
  }

}
