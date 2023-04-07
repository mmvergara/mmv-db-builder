import { Relations } from './types/dbTypes';

export const initialRelations: Relations[] = [
  {
    source_table: 'users',
    source_column: 'id',
    target_table: 'posts',
    target_column: 'user_id',
    relation: 'one-to-many',
  },
  {
    source_table: 'users',
    source_column: 'id',
    target_table: 'comments',
    target_column: 'user_id',
    relation: 'one-to-many',
  },
];

export const initialTables = [
  {
    tableName: 'users',
    columns: [
      { columnName: 'id', columnType: 'int', columnIsKey: true },
      { columnName: 'name', columnType: 'varchar', columnIsKey: false },
      { columnName: 'email', columnType: 'varchar', columnIsKey: false },
    ],
  },
  {
    tableName: 'posts',
    columns: [
      { columnName: 'id', columnType: 'int', columnIsKey: true },
      { columnName: 'title', columnType: 'varchar', columnIsKey: false },
      { columnName: 'content', columnType: 'text', columnIsKey: false },
      { columnName: 'user_id', columnType: 'int', columnIsKey: false },
    ],
  },
  {
    tableName: 'comments',
    columns: [
      { columnName: 'id', columnType: 'int', columnIsKey: true },
      { columnName: 'content', columnType: 'text', columnIsKey: false },
      { columnName: 'user_id', columnType: 'int', columnIsKey: false },
      { columnName: 'post_id', columnType: 'int', columnIsKey: false },
    ],
  },
];
