import { Credentials } from '../../../../src/business/models/results/credentials';

describe('event-input', () => {
    const init: any = {
        login: 'Random login here.',
        password: 'Random password here.',
    };

    let instance: Credentials;

    beforeEach(() => {
        instance = new Credentials(init);
    });

    describe('constructor', () => {
        it('#login is set', () => {
            expect(instance.login).toEqual(init.login);
        });

        it('#password is set', () => {
            expect(instance.password).toEqual(init.password);
        });
    });
});
