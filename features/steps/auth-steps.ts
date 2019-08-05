import { Given, When } from 'cucumber';
import fs from 'fs';

import { Request } from '../support/request';

Given('I am not authenticated', async () => {
    // empty
});

When('I access auth mutation with {string}', async (json) => {
    const query = fs.readFileSync('features/queries/auth.graphql', 'utf8');
    return Request.post(query, { input: JSON.parse(json) });
});
