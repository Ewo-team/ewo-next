export interface DatabaseSchema {
  format: 'keyvalue' | 'array' | 'mapOfArray';
  data: any;
}
