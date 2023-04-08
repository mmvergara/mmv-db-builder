/* eslint-disable camelcase */
import Database from '@dbml/core/types/model_structure/database';
import { Parser } from '@dbml/core';
import { Relations, TableData } from './types/dbTypes';

export const parsedDbmlToTableData = (dbml: Database | null): TableData[] => {
  if (!dbml) return [];
  return dbml.schemas[0].tables.map(({ fields, name }) => {
    return {
      tableName: name,
      columns: fields.map((c) => {
        return {
          columnName: c.name,
          columnType: c.type.type_name,
          columnIsKey: c.pk,
        };
      }),
    };
  });
};

export const editorValToDMBLObject = (value: string) => {
  let parsedDb: null | Database = null;
  let errorMessage: null | string = null;
  try {
    parsedDb = Parser.parse(value, 'dbml');
    return { data: parsedDb, error: null };
  } catch (e: any) {
    errorMessage = '';
    if (e?.location?.start?.line) {
      errorMessage += ` At line ${e?.location?.start?.line} - `;
    }
    if (e?.message) {
      errorMessage += e?.message || '';
    }
    return { data: null, error: errorMessage };
  }
};

export const relationDataToDMBLRelation = (relationData: Relations): string => {
  const { relation, source_column, source_table, target_column, target_table } =
    relationData;
  let dmblRelationType: '<' | '>' | '<>' | '-' = '-';
  if (relation === 'one-to-one') {
    dmblRelationType = '-';
  } else if (relation === 'one-to-many') {
    dmblRelationType = '>';
  } else if (relation === 'many-to-one') {
    dmblRelationType = '<';
  } else if (relation === 'many-to-many') {
    dmblRelationType = '<>';
  }
  return `${source_table}.${source_column} ${dmblRelationType} ${target_table}.${target_column}`;
};
