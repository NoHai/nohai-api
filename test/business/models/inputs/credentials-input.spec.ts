import { CredentialsInput } from '../../../../src/business/models/inputs/credentials-input';

describe('event-input', () => {
    const init: any = {
        login: 'Random login here.',
        password: 'Random password here.',
    };

    let instance: CredentialsInput;

    beforeEach(() => {
        instance = new CredentialsInput(init);
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
