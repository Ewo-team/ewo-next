/**
 * @module Engine.Commands.Tasks
 * Load a database file
 */

import { DatabaseSchema } from '@models';
import * as fs from 'fs';
import { List, Map } from 'immutable';
import * as path from 'path';

declare var __basedir;

const loadDatabase = <V>(databaseName: string, modelHydrater: (item: any, additionnalData?: any) => any, additionnalData?: any): Map<string, V> | List<V> => {

  const database = path.join(__basedir, './data', `${databaseName}.json`);

  console.log(`loading database ${database}`);

  const databaseExist = fs.existsSync(database);
  if (!databaseExist) {
    return List([]);
  }

  const data: DatabaseSchema = JSON.parse(fs.readFileSync(database, { encoding: 'utf8' }));
  let percentOld = -1;

  if (data.format === 'array') {
    const dataArray = (data.data as any[]).map((item, index, array) => {
      const percent = Math.floor(((index + 1) / array.length) * 100);
      console.log({ index, length: array.length });
      if (percent !== percentOld) {
        console.log(`loading... ${percent}%`);
        percentOld = percent;
      }

      return modelHydrater(item, additionnalData);
    });

    return List(dataArray);
  }

  if (data.format === 'mapOfArray') {

    const mapOfArray = {};
    Object.keys(data.data).forEach((key: string) => {
      const current = data.data[key];
      mapOfArray[key] = List((current as any[]).map((item, index, array) => {
        const percent = Math.floor(((index + 1) / array.length) * 100);
        if (percent !== percentOld) {
          console.log(`loading... ${percent}%`);
          percentOld = percent;
        }
        return modelHydrater(item, additionnalData);
      }));
    });

    return Map(mapOfArray);
  }

  const map = {};
  Object.keys(data.data).forEach((key: string, index, array) => {
    const percent = Math.floor(((index + 1) / array.length) * 100);
    console.log({ index, length: array.length });
    if (percent !== percentOld) {
      percentOld = percent;
    }
    map[key] = modelHydrater(data.data[key], additionnalData);
  });

  return Map(map);

};

export const loadDatabaseMap = <V>(databaseName: string, modelHydrater: (item: any, additionnalData?: any) => any, additionnalData?: any): Map<string, V> =>
  loadDatabase(databaseName, modelHydrater, additionnalData) as Map<string, V>;

export const loadDatabaseList = <V>(databaseName: string, modelHydrater: (item: any, additionnalData?: any) => any, additionnalData?: any): List<V> =>
  loadDatabase(databaseName, modelHydrater, additionnalData) as List<V>;
