const fs = require('fs');

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function lowerFirstLetter(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

const caracs = [
  { name: 'hp', spendable: true, label: 'HP' },
  { name: 'speed', spendable: true, enums: 'sp' },
  { name: 'dexterity', spendable: false },
  { name: 'strength', spendable: false },
  { name: 'insight', spendable: false },
  { name: 'agility', spendable: true },
  { name: 'magic', spendable: false }
];

let doc = `{\n`;
let updater = '';
const json = [
  'mat',
  'name',
  'grade',
  'motd',
  'minutes',
  'owner',
  'posture',
  'xp',
  'ep',
  'buffs',
  'maps',
];
const enums = [];

caracs.forEach((carac) => {
  const label = carac.label ? carac.label : carac.name;
  const varname = capitalizeFirstLetter(carac.name);

  enums.push(varname);

  if (carac.spendable) {
    doc += `
      //#region ${label}
        ${carac.name}; // calculated
        current${varname};
        max${varname}; // calculated
        level${varname};
        modif${varname}; // calculated
        bonus${varname}; // calculated
        malus${varname}; // calculated
      //#endregion
    `;

    json.push(`current${varname}`);
    json.push(`level${varname}`);

    updater += `
      character.max${varname} =
      (character.level${varname} * level${varname}Modifier) + RaceTemplate[character.race].${carac.name} + GradeTemplate(character.grade).${carac.name}
      character.${carac.name} = character.max${varname} + character.modif${varname};
    `;

    doc += `
        //#region Regen ${label}
          regen${varname}; // calculated
          maxRegen${varname}; // calculated
          levelRegen${varname};
          modifRegen${varname}; // calculated
          bonusRegen${varname}; // calculated
          malusRegen${varname}; // calculated
        //#endregion
      `;

    json.push(`levelRegen${varname}`);
    enums.push(`Regen${varname}`);

    updater += `
      character.maxRegen${varname} =
      (character.levelRegen${varname} * levelRegen${varname}Modifier) + RaceTemplate[character.race].regen${varname} + GradeTemplate(character.grade).regen${varname};
      character.regen${varname} = character.maxRegen${varname} + character.modifRegen${varname};
    `;

    //updater += `this.updateRegen${varname}();\n`;
  } else {
    doc += `
      //#region ${label}
        current${varname}; // calculated
        ${carac.name}; // calculated
        level${varname};
        modif${varname}; // calculated
        bonus${varname}; // calculated
        malus${varname}; // calculated
      //#endregion
    `;

    json.push(`level${varname}`);

    updater += `
      character.${carac.name} =
      (character.level${varname} * level${varname}Modifier) + RaceTemplate[character.race].${carac.name} + GradeTemplate(character.grade).${carac.name};
      character.current${varname} = character.${carac.name} + character.modif${varname};
    `;


    //updater += `this.update${varname}();\n`;
  }
});

//doc += updater;
//doc += '}';
doc += `}

{
  export const enum CharacterStates {
    ${enums.map(k => {
  return `\n${k} = '${lowerFirstLetter(k)}'`;
})}
  }
}`;



fs.writeFileSync('./generator.class.js', doc);

fs.writeFileSync('./generator.tool.js', `public static updateCharacter(character: Character): Character {
  ${updater}

  return character;
}`);

fs.writeFileSync('./generator.json.js', JSON.stringify(json, null, 2));