import * as fs from 'fs';
import { List, Map } from 'immutable';
import * as path from 'path';
import { DatabaseSchema } from '../models/DatabaseSchema';

declare var __basedir;

export interface ILoadDatabaseParameters {
  databaseName: string;
  modelHydrater: (item: any) => any;
}

const loadDatabase = <V>({ databaseName, modelHydrater }: ILoadDatabaseParameters): Map<string, V> | List<V> => {

  const database = path.join(__basedir, './data', `${databaseName}.json`);

  console.log(`loading database ${database}`);

  const databaseExist = fs.existsSync(database);
  if (!databaseExist) {
    return List([]);
  }

  const data: DatabaseSchema = JSON.parse(fs.readFileSync(database, { encoding: 'utf8' }));

  if (data.format === 'array') {
    const dataArray = (data.data as any[]).map(item => modelHydrater(item));

    return List(dataArray);
  }

  if (data.format === 'mapOfArray') {

    const mapOfArray = {};
    Object.keys(data.data).forEach((key: string) => {
      const current = data.data[key];
      console.log(current);
      mapOfArray[key] = List((current as any[]).map(item => modelHydrater(item)));
    });

    return Map(mapOfArray);
  }

  const map = {};
  Object.keys(data.data).forEach((key: string) => {
    map[key] = modelHydrater(data.data[key]);
  });

  return Map(map);

};

export const loadDatabaseMap = <V>(props: ILoadDatabaseParameters): Map<string, V> =>
  loadDatabase(props) as Map<string, V>;

export const loadDatabaseList = <V>(props: ILoadDatabaseParameters): List<V> =>
  loadDatabase(props) as List<V>;
