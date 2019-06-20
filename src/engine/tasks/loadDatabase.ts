import { DatabaseSchema } from '@models';
import * as fs from 'fs';
import { List, Map } from 'immutable';
import * as path from 'path';

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
  let percentOld = -1;

  if (data.format === 'array') {
    const dataArray = (data.data as any[]).map((item, index, array) => {
      const percent = Math.floor(((index + 1) / array.length) * 100);
      console.log({ index, length: array.length });
      if (percent !== percentOld) {
        console.log(`loading... ${percent}%`);
        percentOld = percent;
      }

      return modelHydrater(item);
    });

    return List(dataArray);
  }

  if (data.format === 'mapOfArray') {

    const mapOfArray = {};
    Object.keys(data.data).forEach((key: string) => {
      const current = data.data[key];
      mapOfArray[key] = List((current as any[]).map((item, index, array) => {
        const percent = Math.floor(((index + 1) / array.length) * 100);
        // console.log({ index, length: array.length, percent, percentOld });
        if (percent !== percentOld) {
          console.log(`loading... ${percent}%`);
          percentOld = percent;
        }
        return modelHydrater(item);
      }));
    });

    return Map(mapOfArray);
  }

  const map = {};
  Object.keys(data.data).forEach((key: string, index: number, array) => {
    const percent = Math.floor(((index + 1) / array.length) * 100);
    console.log({ index, length: array.length });
    if (percent !== percentOld) {
      percentOld = percent;
    }
    map[key] = modelHydrater(data.data[key]);
  });

  return Map(map);

};

export const loadDatabaseMap = <V>(props: ILoadDatabaseParameters): Map<string, V> =>
  loadDatabase(props) as Map<string, V>;

export const loadDatabaseList = <V>(props: ILoadDatabaseParameters): List<V> =>
  loadDatabase(props) as List<V>;
