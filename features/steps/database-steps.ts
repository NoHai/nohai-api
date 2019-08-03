import { Given } from 'cucumber';

import { Database } from '../support/database';

Given('Admin user exists', async () => {
    return Database.execute('INSERT INTO mock.user (id, login, password) VALUES (1, "admin", "admin")');
});
