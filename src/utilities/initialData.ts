import { Parser } from '@dbml/core';
import { parsedDbmlToTableData } from './parsers';
import { Relations } from './types/dbTypes';

export const initialRelations: Relations[] = [
  {
    source_table: 'players',
    source_column: 'player_id',
    target_table: 'teams',
    target_column: 'team_id',
    relation: 'one-to-many',
  },
];

export const initialTablesDBML = () => {
  if (!window.localStorage.getItem('players-position')) {
    window.localStorage.setItem(
      'players-position',
      JSON.stringify({ x: 641, y: 114 })
    );
  }

  if (!window.localStorage.getItem('teams-position')) {
    window.localStorage.setItem(
      'teams-position',
      JSON.stringify({ x: 268, y: 231 })
    );
  }
  return `table players {
    player_id int [pk]
    name varchar
    team_id int
  }

  table teams {
    team_id int [pk]
    name varchar
  }
`;
};

export const initialTableData = parsedDbmlToTableData(
  Parser.parse(initialTablesDBML(), 'dbml')
);

// export const initialTables = [
//   {
//     tableName: 'users',
//     columns: [
//       { columnName: 'id', columnType: 'int', columnIsKey: true },
//       { columnName: 'name', columnType: 'varchar', columnIsKey: false },
//       { columnName: 'email', columnType: 'varchar', columnIsKey: false },
//     ],
//   },
//   {
//     tableName: 'posts',
//     columns: [
//       { columnName: 'id', columnType: 'int', columnIsKey: true },
//       { columnName: 'title', columnType: 'varchar', columnIsKey: false },
//       { columnName: 'content', columnType: 'text', columnIsKey: false },
//       { columnName: 'user_id', columnType: 'int', columnIsKey: false },
//     ],
//   },
//   {
//     tableName: 'comments',
//     columns: [
//       { columnName: 'id', columnType: 'int', columnIsKey: true },
//       { columnName: 'content', columnType: 'text', columnIsKey: false },
//       { columnName: 'user_id', columnType: 'int', columnIsKey: false },
//       { columnName: 'post_id', columnType: 'int', columnIsKey: false },
//     ],
//   },
// ];
