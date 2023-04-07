export interface ColumnData {
  columnName: string;
  columnType: string;
  columnIsKey: boolean;
}

export interface TableData {
  tableName: string;
  columns: ColumnData[];
}

export interface Relations {
  source_table: string;
  source_column: string;
  target_table: string;
  target_column: string;
  relation: 'one-to-one' | 'one-to-many' | 'many-to-one' | 'many-to-many';
}

export interface DBConfig {
  tables: TableData[];
  relations: Relations[];
}
