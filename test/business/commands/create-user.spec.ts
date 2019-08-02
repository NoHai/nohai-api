import { of } from 'rxjs';
import { assert, createStubInstance } from 'sinon';
import { CreateUser } from '../../../src/business/commands/create-user';
import { CredentialsInput } from '../../../src/business/models/inputs/credentials-input';
import { UpdateUserInput } from '../../../src/business/models/inputs/update-user-input';
import { Credentials } from '../../../src/business/models/results/credentials';
import { User } from '../../../src/data/entities/user';
import { UserRepository } from '../../../src/data/repositories/user-repository';

describe('create-user', () => {
    const input = new CredentialsInput();
    const credentials = new Credentials();
    const user = new User();
    const updateInput = new UpdateUserInput();
    const repository = createStubInstance(UserRepository,
        {
            byCredentials: of(user),
            insert: of(credentials),
            update: of(updateInput),
        });
    const instance = new CreateUser(repository);

    describe('execute', () => {
        it('invokes insert from IUserRepository', async () => {
            await instance.execute(input).toPromise();

            assert.calledWith(repository.insert, input);
        });

        it('returns result from IUserRepository', async () => {
            const actual = await instance.execute(input).toPromise();

            expect(actual).toEqual(input);
        });
    });
});
