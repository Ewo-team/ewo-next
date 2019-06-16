import jsExtract from 'js-extract';
import { Character } from '../../Characters/Character';

export interface ILimitedCharacter {
  mat: number;
  name: string;
  race: string;
  xp;
}

const selector = `
  mat,
  name,
  race,
  xp
`;

export const limitedCharacterFromCharacter = (character: Character): ILimitedCharacter => jsExtract(selector).from(character);
