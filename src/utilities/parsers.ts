import Database from '@dbml/core/types/model_structure/database';
import { Parser } from '@dbml/core';
import { TableData } from './types/dbTypes';

export const parsedDbmlToTableData = (dbml: Database): TableData[] => {
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
