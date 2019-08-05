/**
 * @module Engine.Models.Character
 * Genre
 */

export enum Genre {
  Female,
  Male,
  Other,
}

export const GenreFromString = (genre: string | number): Genre => {
  switch (genre) {
    case '0': case 0: return Genre.Female;
    case '1': case 1: return Genre.Male;
    case '2': case 2: return Genre.Other;
    default: return Genre.Other;
  }
};
