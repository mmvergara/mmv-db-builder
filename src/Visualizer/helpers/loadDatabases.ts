import { DatabaseConfigs } from '../types';
import { loadDatabaseConfig } from '../helpers';
import databases from '../../config/databases';

export const loadDatabases = async () => {
  const databaseConfigs: DatabaseConfigs = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const databaseName of Object.keys(databases)) {
    const databaseConfig = await loadDatabaseConfig(databaseName);

    databaseConfigs[databaseName] = databaseConfig;
  }

  return databaseConfigs;
};
export const zzf = '';
