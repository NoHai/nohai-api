import { of } from 'rxjs';
import { User as UserEntity } from '../../../src/data/entities/user';
import { User as UserResult } from '../../../src/business/models/results/user';
import { assert, stub } from 'sinon';
import { UserFactory } from '../../../src/data/factories/user-factory';
import { UserRepository } from '../../../src/data/repositories/user-repository';

describe('user-repository', () => {

    describe('insert', () => {
        const entity = new UserEntity();
        const model = new UserResult();
        const makeEntity = stub(UserFactory, 'makeEntity').withArgs(model).returns(entity);
        const makeResult = stub(UserFactory, 'makeResult').withArgs(entity).returns(model);
        const save = stub(UserEntity.prototype, 'save').returns(of(entity).toPromise());
        const instance = new UserRepository();

        let actual: UserResult;

        beforeAll(async () => {
            actual = await instance.insert(model).toPromise();
        });

        it('invokes UserFactory.makeEntity for event model to event entity mapping', async () => {
            assert.calledWith(makeEntity, model);
        });

        it('saves the entity', async () => {
            assert.calledOnce(save);
        });

        it('invokes UserFactory.makeResult for event entity to event result mapping', async () => {
            assert.calledWith(makeResult, entity);
        });

        it('returns object returned by mapper', async () => {
            expect(actual).toEqual(model);
        });
    });

});
