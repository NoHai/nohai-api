import { Then } from 'cucumber';
import expect from 'expect';

import { Request } from '../support/request';

Then('Gotten {string}.{string} is not empty string', (field1, field2) => {
    expect(Request.lastResponseBody.data[field1][field2]).not.toEqual('');
});
