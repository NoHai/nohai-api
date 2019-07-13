import { CredentialsInput } from '../../../src/business/models/inputs/credentials-input';
import { UserFactory } from '../../../src/data/factories/user-factory';

describe('user-factory', () => {
    describe('#entity.fromCredentialsInput', () => {
        const credentialsInput = new CredentialsInput({ login: 'Login here.', password: 'Password here.' });

        it('#login is set', () => {
            const actual = UserFactory.entity.fromCredentialsInput(credentialsInput);

            expect(actual.login).toEqual(credentialsInput.login);
        });

        it('#password is set', () => {
            const actual = UserFactory.entity.fromCredentialsInput(credentialsInput);

            expect(actual.password).toEqual(credentialsInput.password);
        });
    });
});
