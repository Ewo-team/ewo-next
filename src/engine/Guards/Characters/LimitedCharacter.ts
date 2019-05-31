import jsExtract from 'js-extract';
import { Character } from '../../Characters/Character';

export interface LimitedCharacter {
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

export const limitedCharacterFromCharacter = (character: Character): LimitedCharacter => jsExtract(selector).from(character);
