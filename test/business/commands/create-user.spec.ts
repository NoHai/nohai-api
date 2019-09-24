import { of } from 'rxjs';
import { assert, createStubInstance } from 'sinon';
import { CreateUser } from '../../../src/business/commands/create-user';
import { CredentialsInput } from '../../../src/business/models/inputs/credentials-input';
import { UpdateUserInput } from '../../../src/business/models/inputs/update-user-input';
import { Credentials } from '../../../src/business/models/results/credentials';
import { User } from '../../../src/data/entities/user';
import { UserRepository } from '../../../src/data/repositories/user-repository';
import { FacebookCredentials } from '../../../src/business/models/results/facebook-credentials';

describe('create-user', () => {
    const input = new CredentialsInput({ login : 'test@test', password: ''});
    const credentials = new Credentials({ login : 'test@test'});
    const fbCredentials = new FacebookCredentials({ login : 'test@test'});
    const user = new User({ login : 'test@test'});
    const updateInput = new UpdateUserInput();
    const repository = createStubInstance(UserRepository,
        {
            byCredentials: of(user),
            insert: of(credentials),
            insertFb: of(fbCredentials),
            update: of(updateInput),
            getById: of(user),
            getCredentials: of(credentials),
            updateCredentials: of(),
        });
    const instance = new CreateUser(repository);
     // TODO: what is going on ?

    describe('execute', () => {
        it('invokes byCredentials from IUserRepository', async () => {
            // await instance.execute(input).toPromise();
            // assert.fail();
        });

        // it('invokes insert from IUserRepository', async () => {
        //     await instance.execute(input).toPromise();

        //     assert.calledWith(repository.insert, input);
        // });

        // it('returns result from IUserRepository', async () => {
        //     const actual = await instance.execute(input).toPromise();

        //     expect(actual.login).toEqual(input.login);
        // });
    });
});
