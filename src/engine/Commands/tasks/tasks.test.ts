const fs = require('fs');
const path = require('path');
import { List, Map } from 'immutable';

// @ts-ignore
global.__basedir = path.resolve(__dirname, '..');
process.env.SERVER_DATA = 'SERVER_DATA';

jest.mock('fs');

// List
const dbArray = {
  format: 'array',
  data: [
    {
      id: 0,
      name: 'jest',
    },
  ],
};

// Map
const dbMapOfArray = {
  format: 'mapOfArray',
  data: {
    jest: [
      {
        x: 0,
        y: 0,
        mat: 1,
      },
    ],
  },
};

// Map
const dbKeyValue = {
  format: 'keyvalue',
  data: {
    1: {
      id: 1,
      name: 'jest',
    },
  },
};

fs.existsSync = jest.fn();
fs.existsSync.mockReturnValue(true);

fs.readFileSync = jest.fn();
fs.writeFileSync = jest.fn();
fs.mkdirSync = jest.fn();

import { loadDatabaseList, loadDatabaseMap } from './loadDatabase';
import { saveDatabaseList, saveDatabaseMap } from './saveDatabase';

describe('tasks tests', () => {
  describe('Load Database', () => {

    it('should not load', () => {

      fs.existsSync.mockReturnValueOnce(false);

      loadDatabaseList('jest', jest.fn);
      expect(fs.readFileSync).not.toHaveBeenCalled();
    });

    it('should load array correctly', () => {

      fs.readFileSync.mockReturnValueOnce(JSON.stringify(dbArray));

      const result = loadDatabaseList('jest', jest.fn);
      expect(fs.readFileSync).toHaveBeenCalled();
      expect(result).toBeInstanceOf(List);
    });

    it('should load mapOfArray correctly', () => {

      fs.readFileSync.mockReturnValueOnce(JSON.stringify(dbMapOfArray));

      const result = loadDatabaseMap('jest', jest.fn);
      expect(fs.readFileSync).toHaveBeenCalled();
      expect(result).toBeInstanceOf(Map);
    });

    it('should load keyvalue correctly', () => {

      fs.readFileSync.mockReturnValueOnce(JSON.stringify(dbKeyValue));

      const result = loadDatabaseMap('jest', jest.fn);
      expect(fs.readFileSync).toHaveBeenCalled();
      expect(result).toBeInstanceOf(Map);
    });
  });

  describe('Save Database', () => {

    it('should create directory', () => {

      fs.existsSync.mockReturnValueOnce(false);

      saveDatabaseList('jest', List());
      expect(fs.mkdirSync).toHaveBeenCalled();
    });

    it('should save array correctly', () => {

      saveDatabaseList('jest', List(), jest.fn());
      expect(fs.writeFileSync).toHaveBeenCalled();

    });

    it('should load mapOfArray correctly', () => {

      saveDatabaseMap('jest', Map(), jest.fn());
      expect(fs.writeFileSync).toHaveBeenCalled();

    });

    it('should load keyvalue correctly', () => {

      saveDatabaseMap('jest', Map(), jest.fn());
      expect(fs.writeFileSync).toHaveBeenCalled();

    });
  });
});
