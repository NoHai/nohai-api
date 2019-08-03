import { After, Before } from 'cucumber';
import dotenv from 'dotenv';
import 'reflect-metadata';

process.env.environment = 'mock';
dotenv.config({ path: `.env.${process.env.environment}` });
process.env.TYPEORM_ENTITIES = 'src/data/entities/*.ts';
process.env.TYPEORM_MIGRATIONS = 'src/data/migrations/*.ts';
process.env.TYPEORM_DROP_SCHEMA = 'true';

import { Database } from '../support/database';

Before(async () => {
    await Database.initialize();
});

After(async () => {
    Database.dispose();
});

