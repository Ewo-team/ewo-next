import { CharactersTools } from "@engine/Characters/CharacterTools";

describe('Grade test', () => {
  it('should calculate the correct states', () => {

    // tslint:disable: max-line-length
    const Angel0_1 = { grade: { major: 0, minor: 1 }, hp: 1000, speed: 24, dexterity: 20, strength: 100, agility: 48, insight: 10, magic: 0, regenHp: 10, regenSpeed: 0.5, regenAgility: 1 };
    const Angel1_1 = { grade: { major: 1, minor: 1 }, hp: 1000, speed: 24, dexterity: 20, strength: 100, agility: 48, insight: 10, magic: 0, regenHp: 10, regenSpeed: 0.5, regenAgility: 1 };
    const Angel2_1 = { grade: { major: 2, minor: 1 }, hp: 1000, speed: 24, dexterity: 20, strength: 100, agility: 48, insight: 10, magic: 0, regenHp: 10, regenSpeed: 0.5, regenAgility: 1 };
    const Angel2_2 = { grade: { major: 2, minor: 2 }, hp: 1050, speed: 24, dexterity: 20, strength: 105, agility: 50, insight: 10, magic: 0, regenHp: 10, regenSpeed: 0.5, regenAgility: 1.05 };
    const Angel2_3 = { grade: { major: 2, minor: 3 }, hp: 1100, speed: 24, dexterity: 20, strength: 110, agility: 50, insight: 10, magic: 0, regenHp: 10, regenSpeed: 0.5, regenAgility: 1.05 };
    const Angel2_4 = { grade: { major: 2, minor: 4 }, hp: 1150, speed: 24, dexterity: 22, strength: 115, agility: 50, insight: 10, magic: 0, regenHp: 10, regenSpeed: 0.5, regenAgility: 1.05 };
    const Angel3_2 = { grade: { major: 3, minor: 2 }, hp: 1200, speed: 24, dexterity: 22, strength: 115, agility: 50, insight: 10, magic: 0, regenHp: 10, regenSpeed: 0.5, regenAgility: 1.05 };
    const Angel3_3 = { grade: { major: 3, minor: 3 }, hp: 1250, speed: 24, dexterity: 22, strength: 120, agility: 50, insight: 10, magic: 0, regenHp: 10, regenSpeed: 0.5, regenAgility: 1.05 };
    const Angel3_4 = { grade: { major: 3, minor: 4 }, hp: 1300, speed: 24, dexterity: 24, strength: 130, agility: 50, insight: 10, magic: 0, regenHp: 10, regenSpeed: 0.5, regenAgility: 1.05 };
    const Angel4_1 = { grade: { major: 4, minor: 1 }, hp: 1750, speed: 28, dexterity: 25, strength: 125, agility: 50, insight: 12, magic: 0, regenHp: 10, regenSpeed: 0.5, regenAgility: 1.05 };
    const Angel4_2 = { grade: { major: 4, minor: 2 }, hp: 1800, speed: 28, dexterity: 27, strength: 125, agility: 50, insight: 12, magic: 0, regenHp: 10, regenSpeed: 0.5, regenAgility: 1.05 };
    const Angel4_3 = { grade: { major: 4, minor: 3 }, hp: 1850, speed: 28, dexterity: 27, strength: 130, agility: 50, insight: 12, magic: 0, regenHp: 10, regenSpeed: 0.5, regenAgility: 1.05 };
    const Angel4_4 = { grade: { major: 4, minor: 4 }, hp: 1900, speed: 28, dexterity: 29, strength: 135, agility: 52, insight: 12, magic: 0, regenHp: 10, regenSpeed: 0.5, regenAgility: 1.1 };
    const Angel5_1 = { grade: { major: 5, minor: 1 }, hp: 2500, speed: 30, dexterity: 30, strength: 140, agility: 52, insight: 14, magic: 0, regenHp: 10, regenSpeed: 0.5, regenAgility: 1.1 };
    const Angel5_2 = { grade: { major: 5, minor: 2 }, hp: 2600, speed: 30, dexterity: 32, strength: 145, agility: 52, insight: 14, magic: 0, regenHp: 10, regenSpeed: 0.5, regenAgility: 1.1 };
    const Angel5_3 = { grade: { major: 5, minor: 3 }, hp: 2800, speed: 30, dexterity: 32, strength: 150, agility: 52, insight: 14, magic: 0, regenHp: 10, regenSpeed: 0.5, regenAgility: 1.1 };
    const Angel5_4 = { grade: { major: 5, minor: 4 }, hp: 3000, speed: 30, dexterity: 34, strength: 155, agility: 54, insight: 14, magic: 0, regenHp: 10, regenSpeed: 0.5, regenAgility: 1.15 };
    const Paria0_1 = { grade: { major: 0, minor: 1 }, hp: 800, speed: 24, dexterity: 18, strength: 100, agility: 48, insight: 10, magic: 0, regenHp: 10, regenSpeed: 0.5, regenAgility: 1 };
    const Paria1_1 = { grade: { major: 1, minor: 1 }, hp: 800, speed: 24, dexterity: 18, strength: 100, agility: 48, insight: 10, magic: 0, regenHp: 10, regenSpeed: 0.5, regenAgility: 1 };
    const Paria2_1 = { grade: { major: 2, minor: 1 }, hp: 800, speed: 24, dexterity: 18, strength: 100, agility: 48, insight: 10, magic: 0, regenHp: 10, regenSpeed: 0.5, regenAgility: 1 };
    const Paria2_2 = { grade: { major: 2, minor: 2 }, hp: 850, speed: 24, dexterity: 18, strength: 105, agility: 50, insight: 10, magic: 0, regenHp: 10, regenSpeed: 0.5, regenAgility: 1.05 };
    const Paria2_3 = { grade: { major: 2, minor: 3 }, hp: 900, speed: 24, dexterity: 18, strength: 110, agility: 50, insight: 10, magic: 0, regenHp: 10, regenSpeed: 0.5, regenAgility: 1.05 };
    const Paria2_4 = { grade: { major: 2, minor: 4 }, hp: 950, speed: 24, dexterity: 20, strength: 115, agility: 50, insight: 10, magic: 0, regenHp: 10, regenSpeed: 0.5, regenAgility: 1.05 };
    const Paria3_2 = { grade: { major: 3, minor: 2 }, hp: 1000, speed: 24, dexterity: 20, strength: 115, agility: 50, insight: 10, magic: 0, regenHp: 10, regenSpeed: 0.5, regenAgility: 1.05 };
    const Paria3_3 = { grade: { major: 3, minor: 3 }, hp: 1050, speed: 24, dexterity: 20, strength: 120, agility: 50, insight: 10, magic: 0, regenHp: 10, regenSpeed: 0.5, regenAgility: 1.05 };
    const Paria3_4 = { grade: { major: 3, minor: 4 }, hp: 1100, speed: 24, dexterity: 22, strength: 130, agility: 50, insight: 10, magic: 0, regenHp: 10, regenSpeed: 0.5, regenAgility: 1.05 };
    const Paria4_1 = { grade: { major: 4, minor: 1 }, hp: 1550, speed: 28, dexterity: 23, strength: 125, agility: 50, insight: 12, magic: 0, regenHp: 10, regenSpeed: 0.5, regenAgility: 1.05 };
    const Paria4_2 = { grade: { major: 4, minor: 2 }, hp: 1600, speed: 28, dexterity: 25, strength: 125, agility: 50, insight: 12, magic: 0, regenHp: 10, regenSpeed: 0.5, regenAgility: 1.05 };
    const Paria4_3 = { grade: { major: 4, minor: 3 }, hp: 1650, speed: 28, dexterity: 25, strength: 130, agility: 50, insight: 12, magic: 0, regenHp: 10, regenSpeed: 0.5, regenAgility: 1.05 };
    const Paria4_4 = { grade: { major: 4, minor: 4 }, hp: 1700, speed: 28, dexterity: 27, strength: 135, agility: 52, insight: 12, magic: 0, regenHp: 10, regenSpeed: 0.5, regenAgility: 1.1 };
    const Paria5_1 = { grade: { major: 5, minor: 1 }, hp: 2300, speed: 30, dexterity: 28, strength: 140, agility: 52, insight: 14, magic: 0, regenHp: 10, regenSpeed: 0.5, regenAgility: 1.1 };
    const Paria5_2 = { grade: { major: 5, minor: 2 }, hp: 2400, speed: 30, dexterity: 30, strength: 145, agility: 52, insight: 14, magic: 0, regenHp: 10, regenSpeed: 0.5, regenAgility: 1.1 };
    const Paria5_3 = { grade: { major: 5, minor: 3 }, hp: 2600, speed: 30, dexterity: 30, strength: 150, agility: 52, insight: 14, magic: 0, regenHp: 10, regenSpeed: 0.5, regenAgility: 1.1 };
    const Paria5_4 = { grade: { major: 5, minor: 4 }, hp: 2800, speed: 30, dexterity: 32, strength: 155, agility: 54, insight: 14, magic: 0, regenHp: 10, regenSpeed: 0.5, regenAgility: 1.15 };

    expect(CharactersTools.factory({ mat: 1, name: 'test', race: 'an', grade: { major: 0, minor: 1 } })).toMatchObject(Angel0_1);
    expect(CharactersTools.factory({ mat: 1, name: 'test', race: 'an', grade: { major: 1, minor: 1 } })).toMatchObject(Angel1_1);
    expect(CharactersTools.factory({ mat: 1, name: 'test', race: 'an', grade: { major: 2, minor: 1 } })).toMatchObject(Angel2_1);
    expect(CharactersTools.factory({ mat: 1, name: 'test', race: 'an', grade: { major: 2, minor: 2 } })).toMatchObject(Angel2_2);
    expect(CharactersTools.factory({ mat: 1, name: 'test', race: 'an', grade: { major: 2, minor: 3 } })).toMatchObject(Angel2_3);
    expect(CharactersTools.factory({ mat: 1, name: 'test', race: 'an', grade: { major: 2, minor: 4 } })).toMatchObject(Angel2_4);
    expect(CharactersTools.factory({ mat: 1, name: 'test', race: 'an', grade: { major: 3, minor: 2 } })).toMatchObject(Angel3_2);
    expect(CharactersTools.factory({ mat: 1, name: 'test', race: 'an', grade: { major: 3, minor: 3 } })).toMatchObject(Angel3_3);
    expect(CharactersTools.factory({ mat: 1, name: 'test', race: 'an', grade: { major: 3, minor: 4 } })).toMatchObject(Angel3_4);
    expect(CharactersTools.factory({ mat: 1, name: 'test', race: 'an', grade: { major: 4, minor: 1 } })).toMatchObject(Angel4_1);
    expect(CharactersTools.factory({ mat: 1, name: 'test', race: 'an', grade: { major: 4, minor: 2 } })).toMatchObject(Angel4_2);
    expect(CharactersTools.factory({ mat: 1, name: 'test', race: 'an', grade: { major: 4, minor: 3 } })).toMatchObject(Angel4_3);
    expect(CharactersTools.factory({ mat: 1, name: 'test', race: 'an', grade: { major: 4, minor: 4 } })).toMatchObject(Angel4_4);
    expect(CharactersTools.factory({ mat: 1, name: 'test', race: 'an', grade: { major: 5, minor: 1 } })).toMatchObject(Angel5_1);
    expect(CharactersTools.factory({ mat: 1, name: 'test', race: 'an', grade: { major: 5, minor: 2 } })).toMatchObject(Angel5_2);
    expect(CharactersTools.factory({ mat: 1, name: 'test', race: 'an', grade: { major: 5, minor: 3 } })).toMatchObject(Angel5_3);
    expect(CharactersTools.factory({ mat: 1, name: 'test', race: 'an', grade: { major: 5, minor: 4 } })).toMatchObject(Angel5_4);
    expect(CharactersTools.factory({ mat: 1, name: 'test', race: 'pa', grade: { major: 0, minor: 1 } })).toMatchObject(Paria0_1);
    expect(CharactersTools.factory({ mat: 1, name: 'test', race: 'pa', grade: { major: 1, minor: 1 } })).toMatchObject(Paria1_1);
    expect(CharactersTools.factory({ mat: 1, name: 'test', race: 'pa', grade: { major: 2, minor: 1 } })).toMatchObject(Paria2_1);
    expect(CharactersTools.factory({ mat: 1, name: 'test', race: 'pa', grade: { major: 2, minor: 2 } })).toMatchObject(Paria2_2);
    expect(CharactersTools.factory({ mat: 1, name: 'test', race: 'pa', grade: { major: 2, minor: 3 } })).toMatchObject(Paria2_3);
    expect(CharactersTools.factory({ mat: 1, name: 'test', race: 'pa', grade: { major: 2, minor: 4 } })).toMatchObject(Paria2_4);
    expect(CharactersTools.factory({ mat: 1, name: 'test', race: 'pa', grade: { major: 3, minor: 2 } })).toMatchObject(Paria3_2);
    expect(CharactersTools.factory({ mat: 1, name: 'test', race: 'pa', grade: { major: 3, minor: 3 } })).toMatchObject(Paria3_3);
    expect(CharactersTools.factory({ mat: 1, name: 'test', race: 'pa', grade: { major: 3, minor: 4 } })).toMatchObject(Paria3_4);
    expect(CharactersTools.factory({ mat: 1, name: 'test', race: 'pa', grade: { major: 4, minor: 1 } })).toMatchObject(Paria4_1);
    expect(CharactersTools.factory({ mat: 1, name: 'test', race: 'pa', grade: { major: 4, minor: 2 } })).toMatchObject(Paria4_2);
    expect(CharactersTools.factory({ mat: 1, name: 'test', race: 'pa', grade: { major: 4, minor: 3 } })).toMatchObject(Paria4_3);
    expect(CharactersTools.factory({ mat: 1, name: 'test', race: 'pa', grade: { major: 4, minor: 4 } })).toMatchObject(Paria4_4);
    expect(CharactersTools.factory({ mat: 1, name: 'test', race: 'pa', grade: { major: 5, minor: 1 } })).toMatchObject(Paria5_1);
    expect(CharactersTools.factory({ mat: 1, name: 'test', race: 'pa', grade: { major: 5, minor: 2 } })).toMatchObject(Paria5_2);
    expect(CharactersTools.factory({ mat: 1, name: 'test', race: 'pa', grade: { major: 5, minor: 3 } })).toMatchObject(Paria5_3);
    expect(CharactersTools.factory({ mat: 1, name: 'test', race: 'pa', grade: { major: 5, minor: 4 } })).toMatchObject(Paria5_4);

  });
});