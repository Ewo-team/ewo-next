import { CharactersTools } from '../../src/engine/Characters/CharacterTools';
import { Character, CharacterDatabase } from '../../src/engine/models';
import { Plans, Races } from '../../src/engine/resources';

export const characterDatabaseDefaultMat1: Partial<CharacterDatabase> = {
  mat: 1,
  name: 'Character in action',
  grade: {
    major: 2,
    minor: 1,
  },
  race: 'hu',
  currentHp: Races.an.template.hp * 0.6,
  currentSpeed: Races.an.template.speed * 0.5,
  currentAgility: Races.an.template.agility * 0.75,
  maps: 'althian',
  minutes: 17,
};

export const characterDefaultMat1: Character = {
  ...CharactersTools.factory(characterDatabaseDefaultMat1),
  position: {
    plan: Plans.althian,
    coord: {
      x: 15,
      y: -5,
      character: null,
    },
  },
};

export const characterFrontendDefaultMat1 = CharactersTools.toFrontEnd(characterDefaultMat1);
export const characterFrontendLimitedDefaultMat1 = CharactersTools.toFrontEndLimited(characterDefaultMat1);

export const characterDatabaseDeadMat2: Partial<CharacterDatabase> = {
  mat: 2,
  name: 'Dead Character',
  grade: {
    major: 2,
    minor: 1,
  },
  race: 'de',
  currentHp: 0,
};

export const characterDeadMat2 = CharactersTools.factory(characterDatabaseDeadMat2);
export const characterFrontendDeadMat2 = CharactersTools.toFrontEnd(characterDeadMat2);
export const characterFrontendLimitedDeadMat2 = CharactersTools.toFrontEndLimited(characterDeadMat2);

export const characterDatabaseFullMat3: Partial<CharacterDatabase> = {
  mat: 3,
  name: 'Full Endurance Character',
  grade: {
    major: 2,
    minor: 1,
  },
  race: 'an',
  currentHp: Races.an.template.hp,
  currentSpeed: Races.an.template.speed,
  currentAgility: Races.an.template.agility,
};

export const characterFullMat3: Character = {
  ...CharactersTools.factory(characterDatabaseFullMat3),
  position: {
    plan: Plans.althian,
    coord: {
      x: 1,
      y: 2,
      character: null,
    },
  },
};

characterFullMat3.position.coord.character = characterFullMat3;

export const characterFrontendFullMat3 = CharactersTools.toFrontEnd(characterFullMat3);
export const characterFrontendLimitedFullMat3 = CharactersTools.toFrontEndLimited(characterFullMat3);
