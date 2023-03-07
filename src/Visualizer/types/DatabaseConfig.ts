import { EdgeConfig } from './EdgeConfig';
import { SchemaColors } from './SchemaColors';
import { TableConfig } from './TableConfig';
import { TablePositions } from './TablePositions';

export type Database = {
  name: string;
  description: string;
};

export type Databases = {
  [databaseName: string]: Database;
};

export type DatabaseConfig = {
  tables: TableConfig[];
  edgeConfigs: EdgeConfig[];
  schemaColors: SchemaColors;
  tablePositions: TablePositions;
};

export type DatabaseConfigs = {
  [databaseName: string]: DatabaseConfig;
};

const DatabaseConfigExample: DatabaseConfig = {
  tables: [
    {
      name: 'transactions',
      description: 'This table contains transactions of all vendors.',
      schemaColor: '#91C4F2',
      columns: [
        {
          name: 'id',
          key: true,
          description: 'Unique identifier of a transaction.',
          type: 'bigint',
        },
        {
          name: 'vendor_id',
          description: 'ID of a vendor from the vendors table.',
          type: 'bigint',
        },
        {
          name: 'amount_usd',
          description:
            "Transaction's amount in USD. Positive value indicates a credit transaction, negative indicates debit transaction.",
          type: 'numeric',
        },
        {
          name: 'created_at',
          description: 'Timestamp of a transaction.',
          type: 'timestamp',
        },
      ],
    },
    {
      name: 'vendors',
      description: 'This table contains all vendors.',
      schemaColor: '#91C4F2',
      columns: [
        {
          name: 'id',
          key: true,
          description:
            'Unique identifier of a vendor. A vendor can have credit transactions with us (pay us money) and debit transactions (we pay money to a vendor).',
          type: 'bigint',
        },
        {
          name: 'name',
          description: "Vendor's name (could be a person or a company).",
          type: 'text',
        },
      ],
    },
  ],
  schemaColors: {
    DEFAULT: '#91C4F2',
    public: '#91C4F2',
  },
  edgeConfigs: [
    {
      source: 'vendors',
      sourceKey: 'id',
      target: 'transactions',
      targetKey: 'vendor_id',
      relation: 'hasMany',
    },
  ],
  tablePositions: {
    'public.transactions': {
      x: 192,
      y: 176,
    },
    'public.vendors': {
      x: -64,
      y: 240,
    },
  },
};

const dbConfigToSql = (dbConfig: DatabaseConfig) => {
  let sql = '';
  let sqlAlter = '';
  const { tables, edgeConfigs } = dbConfig;

  // Create tables
  for (let i = 0; i < tables.length; i += 1) {
    sql += `CREATE TABLE ${tables[i].name} (\n${tables[i].columns
      .map(
        (c) => `${c.name} ${c.type.toUpperCase()} ${c.key ? 'PRIMARY KEY' : ''}`
      )
      .join(',\n')}\n)`;
    sql += `;\n\n`;
  }

  // Add foreign keys
  for (let i = 0; i < edgeConfigs.length; i += 1) {
    const { source, sourceKey, target, targetKey, relation } = edgeConfigs[i];
    if (relation === 'hasMany') {
      sqlAlter += `ALTER TABLE ${target} ADD CONSTRAINT ${target}_${source}_fk FOREIGN KEY (${targetKey}) REFERENCES ${source} (${sourceKey});\n`;
    }
    if (relation === 'hasOne') {
      sqlAlter += `ALTER TABLE ${source} ADD CONSTRAINT ${source}_${target}_fk FOREIGN KEY (${sourceKey}) REFERENCES ${target} (${targetKey});\n`;
    }
  }

  return `${sql}\n${sqlAlter}`;
};

console.log(dbConfigToSql(DatabaseConfigExample));
