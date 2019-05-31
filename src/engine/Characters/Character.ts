import { Hydrater } from '../models/Hydrater';

export class Character extends Hydrater {
  public mat: number;
  public name: string;

  public race: string;

  public owner: number;

  public hp = 40;
  public regen = 5;
  public insight = 3; // distance of view
  public speed = 4; // number of movement points
  public dexterity = 10; // number of atq/defense points
  public strength = 4; // damage
  public agility = 2; // number on actions points

  // private magic; // level of magic

  public xp = 0;
  public ap = 0;

  public maps = 'earth';

  public static properties = ['mat', 'name', 'race', 'owner', 'hp', 'regen', 'insight', 'speed', 'dexterity', 'strength', 'agility', 'maps'];

  protected getProperties(): string[] {
    return Character.properties;
  }

}

export const characterHydrater = (source: any) => new Character(source);
