/**
 * @module Engine.Commands.Tasks
 * Save a database file
 */

import * as fs from 'fs';
import { List, Map } from 'immutable';
import * as path from 'path';

declare var __basedir: string;

const saveDatabase = (databaseName: string, values: Map<string, any> | List<any>, format: string, serializer?: (source) => any): void => {

  if (!fs.existsSync(path.join(__basedir, './data'))) {
    fs.mkdirSync(path.join(__basedir, './data'));
  }

  const database = path.join(__basedir, './data', `${databaseName}.json`);

  console.log(`saving database ${database}`);

  let serializedValues = values;

  if (serializer) {
    if (format === 'array') {
      serializedValues = (values as List<any>).map(serializer);
    } else {
      serializedValues = (values as Map<string, any>).map(value => serializer(value));
    }
  }

  const data = {
    format,
    data: serializedValues.toJSON(),
  };

  fs.writeFileSync(database, JSON.stringify(data, null, 2));
};

export const saveDatabaseMap =
  <V>(databaseName: string, values: Map<string, V>, serializer?: (source) => any) =>
    saveDatabase(databaseName, values, 'keyvalue', serializer);

export const saveDatabaseList =
  <V>(databaseName: string, values: List<V>, serializer?: (source) => any) =>
    saveDatabase(databaseName, values, 'array', serializer);
