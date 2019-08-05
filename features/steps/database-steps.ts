import { Given } from 'cucumber';

import { User } from '../../src/data/entities/user';

Given('Admin user exists', async () => {
    const user = new User({ login: 'admin', password: 'admin' });
    return user.save();
});
