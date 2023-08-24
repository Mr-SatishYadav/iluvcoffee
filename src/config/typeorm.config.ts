import * as dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';
import databaseConfig from './database.config';

dotenv.config();

export default databaseConfig() as DataSourceOptions;
