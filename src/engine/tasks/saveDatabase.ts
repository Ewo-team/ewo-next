import * as fs from 'fs';
import { List, Map } from 'immutable';
import * as path from 'path';

declare var __basedir: string;

const saveDatabase = (databaseName: string, values: any, format: string): void => {

  const database = path.join(__basedir, './data', `${databaseName}.json`);

  console.log(`saving database ${database}`);

  const data = {
    format,
    data: values,
  };

  fs.writeFileSync(database, JSON.stringify(data, null, 2));
};

export const saveDatabaseMap = <V>(databaseName: string, values: Map<string, V>) => saveDatabase(databaseName, values, 'keyvalue');

export const saveDatabaseList = <V>(databaseName: string, values: List<V>) => saveDatabase(databaseName, values, 'array');
