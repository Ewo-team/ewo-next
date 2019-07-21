import { Grade } from '@models';

// tslint:disable-next-line: max-func-body-length
export const GradeTemplate = (grade: Grade) => {
  const baseState = {
    hp: 0,
    speed: 0,
    dexterity: 0,
    strength: 0,
    agility: 0,
    insight: 0,
    magic: 0,
    regenHp: 0,
    regenSpeed: 0,
    regenAgility: 0,
  };

  let value = { ...baseState };

  if (grade.major === 2 && grade.minor >= 2) {

    value = {
      ...value,
      agility: 2,
      regenAgility: 0.05,
    };

    if (grade.minor === 2) {
      value = {
        ...value,
        hp: 50,
        strength: 5,
      };
    }

    if (grade.minor === 3) {
      value = {
        ...value,
        hp: 100,
        strength: 10,
      };
    }

    if (grade.minor === 4) {
      value = {
        ...value,
        hp: 150,
        dexterity: 2,
        strength: 15,
      };
    }
  }

  if (grade.major === 3 && grade.minor >= 1) {
    value = {
      ...value,
      dexterity: 2,
      agility: 2,
      regenAgility: 0.05,
    };

    if (grade.minor === 1) {
      value = {
        ...value,
        hp: 150,
        strength: 15,
      };
    }

    if (grade.minor === 2) {
      value = {
        ...value,
        hp: 200,
        strength: 15,
      };
    }

    if (grade.minor === 3) {
      value = {
        ...value,
        hp: 250,
        strength: 20,
      };
    }

    if (grade.minor === 4) {
      value = {
        ...value,
        hp: 300,
        dexterity: 4,
        strength: 30,
      };
    }
  }

  if (grade.major === 4) {
    value = {
      ...value,
      hp: 750,
      speed: 4,
      dexterity: 5,
      strength: 25,
      agility: 2,
      insight: 2,
      regenAgility: 0.05,
    };

    if (grade.minor === 2) {
      value = {
        ...value,
        hp: 800,
        dexterity: 7,
      };
    }

    if (grade.minor === 3) {
      value = {
        ...value,
        hp: 850,
        strength: 30,
        dexterity: 7,
      };
    }

    if (grade.minor === 4) {
      value = {
        ...value,
        hp: 900,
        dexterity: 9,
        strength: 35,
        agility: 4,
        regenAgility: 0.1,
      };
    }
  }

  if (grade.major === 5) {
    value = {
      ...value,
      hp: 1500,
      speed: 6,
      dexterity: 10,
      strength: 40,
      agility: 4,
      insight: 4,
      regenAgility: 0.1,
    };

    if (grade.minor === 2) {
      value = {
        ...value,
        hp: 1600,
        strength: 45,
        dexterity: 12,
      };
    }

    if (grade.minor === 3) {
      value = {
        ...value,
        hp: 1800,
        strength: 50,
        dexterity: 12,
      };
    }

    if (grade.minor === 4) {
      value = {
        ...value,
        hp: 2000,
        dexterity: 14,
        strength: 55,
        agility: 6,
        regenAgility: 0.15,
      };
    }
  }

  return value;

};
