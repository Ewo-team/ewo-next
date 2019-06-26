import { CharactersTools } from '@engine/Characters/CharacterTools';
import { RaceTemplate } from '@engine/resources';

export const characterDefault = CharactersTools.factory(1, 'Basic Character', {
  race: 'an',
  currentHp: RaceTemplate.an.hp,
  currentSpeed: RaceTemplate.an.speed,
  currentAgiliy: RaceTemplate.an.agility,
});
export const characterDead = CharactersTools.factory(2, 'Dead Character', {
  race: 'an',
  currentHp: 0,
});
export const characterFull = CharactersTools.factory(3, 'Character in action', {
  race: 'an',
  currentHp: RaceTemplate.an.hp * 0.6,
  currentSpeed: RaceTemplate.an.speed * 0.5,
  currentAgiliy: RaceTemplate.an.agility * 0.75,
});

/*
   hp: 200,
   speed: 6,
   dexterity: 9,
   strength: 20,
   agility: 2,
   insight: 5,
   magic: 0,
   regenHp: 5,
   regenSpeed: 1,
   regenAgility: 1,
*/
