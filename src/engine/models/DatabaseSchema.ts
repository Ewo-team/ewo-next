/**
 * @module Engine.Models
 * Database structures
 */
export interface DatabaseSchema {
  format: 'keyvalue' | 'array' | 'mapOfArray';
  data: any;
}
