import { User as UserEntity } from '../../../src/data/entities/user';
import { CredentialsFactory } from '../../../src/data/factories/credentials-factory';

describe('credentials-factory', () => {
    describe('#result.fromUerEntity', () => {
        const entity = new UserEntity({ login: 'Random login here.', password: 'Random password here.' });

        it('#login is set', () => {
            const actual = CredentialsFactory.result.fromUserEntity(entity);

            expect(actual.login).toEqual(entity.login);
        });

        it('#password is set', () => {
            const actual = CredentialsFactory.result.fromUserEntity(entity);

            expect(actual.password).toEqual(entity.password);
        });
    });
});
