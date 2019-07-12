/**
 * @module Engine.Models
 * Races
 */

export enum Races {
  Angel = 'an',
  Demon = 'de',
  Human = 'hu',
  NoRace = 'no', // no race, when the race doesn't exist
}

export const ListRaces = {
  [Races.Angel]: 'Ange',
  [Races.Demon]: 'Démon',
  [Races.Human]: 'Humain',
};

export const RaceFromString = (race: string): Races => {
  switch (race) {
    case 'an': return Races.Angel;
    case 'de': return Races.Demon;
    case 'hu': return Races.Human;
    default: return Races.NoRace;
  }
};
