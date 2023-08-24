import typeormConfig from 'src/config/typeorm.config';
import { DataSource } from 'typeorm';

export default new DataSource(typeormConfig);
