import { BeforeAll } from 'cucumber';
import 'reflect-metadata';

process.env.environment = 'mock';

import { Database } from '../support/database';

BeforeAll(async () => {
    return Database.initialize();
});
