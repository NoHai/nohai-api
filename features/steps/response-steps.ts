import { Then } from 'cucumber';
import expect from 'expect';

import { Request } from '../support/request';

Then('Gotten data is null', () => {
    expect(Request.lastResponseBody.data).toBeFalsy();
});

Then('Gotten errors is not null', () => {
    expect(Request.lastResponseBody.errors).toBeTruthy();
});

Then('Gotten {string}.{string} is not empty string', (field1, field2) => {
    expect(Request.lastResponseBody.data[field1][field2]).not.toEqual('');
});
