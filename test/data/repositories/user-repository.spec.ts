import { of } from 'rxjs';
import { assert, stub } from 'sinon';
import { CredentialsInput } from '../../../src/business/models/inputs/credentials-input';
import { Credentials } from '../../../src/business/models/results/credentials';
import { User as UserEntity } from '../../../src/data/entities/user';
import { CredentialsFactory } from '../../../src/data/factories/credentials-factory';
import { UserFactory } from '../../../src/data/factories/user-factory';
import { UserRepository } from '../../../src/data/repositories/user-repository';

describe('user-repository', () => {

    describe('insert', () => {
        const instance = new UserRepository();
        const entity = new UserEntity();

        describe('#insert', () => {
            const input = new CredentialsInput();
            const model = new Credentials();
            const makeEntity = stub(UserFactory.entity, 'fromCredentialsInput').withArgs(input).returns(entity);
            const makeResult = stub(CredentialsFactory.result, 'fromUserEntity').withArgs(entity).returns(model);
            const save = stub(UserEntity.prototype, 'save').returns(of(entity).toPromise());

            let actual: Credentials;

            beforeAll(async () => {
                actual = await instance.insert(input).toPromise();
            });

            it('invokes #UserFactory.entity.fromCredentialsInput', async () => {
                assert.calledWith(makeEntity, input);
            });

            it('saves the entity', async () => {
                assert.calledOnce(save);
            });

            it('invokes #CredentialsFactory.result.fromUserEntity', async () => {
                assert.calledWith(makeResult, entity);
            });

            it('returns result from #UserFactory.result.fromUserEntity', async () => {
                expect(actual).toEqual(model);
            });
        });
    });

});
