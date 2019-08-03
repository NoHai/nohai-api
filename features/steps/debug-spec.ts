import { Then } from 'cucumber';

import { Request } from '../support/request';

Then('Log last response', () => {
    console.log(JSON.stringify(Request.lastResponse.data));
});
