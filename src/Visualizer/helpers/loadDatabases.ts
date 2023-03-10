import databases from '../../config/databases';
import {
  EdgeConfig,
  SchemaColors,
  TableConfig,
  TablePositions,
  DatabaseConfigs,
} from '../../types/DatabaseConfig';
import { fullTableName } from './ui-helpers';

export const loadDatabaseConfig = async (databaseName: string) => {
  const edgeConfigs = (
    await import(`../../config/databases/${databaseName}/edges.json`)
  ).default as EdgeConfig[];
  const tablePositions = (
    await import(`../../config/databases/${databaseName}/tablePositions.json`)
  ).default as TablePositions;
  const schemaColors = (
    await import(`../../config/databases/${databaseName}/schemaColors.json`)
  ).default as SchemaColors;
  const tables = (await import(`../../config/databases/${databaseName}/tables`))
    .default as TableConfig[];

  edgeConfigs.forEach((edgeConfig: EdgeConfig) => {
    const sourceTableName = fullTableName(edgeConfig.source);
    const targetTableName = fullTableName(edgeConfig.target);

    edgeConfig.source = sourceTableName;
    edgeConfig.target = targetTableName;
  });

  tables.forEach((table) => {
    table.schemaColor = 'teal';
  });

  return {
    tables,
    tablePositions,
    edgeConfigs,
    schemaColors,
  };
};

export const loadDatabases = async () => {
  const databaseConfigs: DatabaseConfigs = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const databaseName of Object.keys(databases)) {
    // eslint-disable-next-line no-await-in-loop
    const databaseConfig = await loadDatabaseConfig(databaseName);

    databaseConfigs[databaseName] = databaseConfig;
  }

  return databaseConfigs;
};
