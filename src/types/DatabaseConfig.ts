export interface SchemaColors {
  [schemaName: string]: string;
}

export interface Position {
  x: number;
  y: number;
}
export interface TablePositions {
  [tableName: string]: Position;
}

export interface EdgeConfig {
  source: string;
  sourceKey: string;
  target: string;
  targetKey: string;
  relation: string;
  sourcePosition?: string;
  targetPosition?: string;
}

export type Database = {
  name: string;
  description: string;
};

export type Databases = {
  [databaseName: string]: Database;
};
export interface TableColumnConfig {
  name: string;
  description: string;
  type: string;
  handleType?: string;
  key?: boolean;
}

export interface TableConfig {
  schema?: string;
  schemaColor?: string;
  name: string;
  description?: string;
  columns: TableColumnConfig[];
}

export type DatabaseConfig = {
  tables: TableConfig[];
  edgeConfigs: EdgeConfig[];
  schemaColors: SchemaColors;
  tablePositions: TablePositions;
};

export type DatabaseConfigs = {
  [databaseName: string]: DatabaseConfig;
};

export type DBConfig = {
  tables: {
    schema?: string;
    schemaColor?: string;
    name: string;
    description?: string;
    columns: {
      name: string;
      description: string;
      type: string;
      handleType?: string;
      key?: boolean;
    }[];
  }[];
};
