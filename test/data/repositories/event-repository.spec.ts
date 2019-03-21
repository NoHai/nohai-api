import { of } from 'rxjs';
import { Event as EventEntity } from '../../../src/data/entities/event';
import { Event as EventResult } from '../../../src/business/models/results/event';
import { assert, stub } from 'sinon';
import { EventFactory } from '../../../src/data/factories/event-factory';
import { EventRepository } from '../../../src/data/repositories/event-repository';

describe('event-repository', () => {

    describe('insert', () => {
        const entity = new EventEntity();
        const model = new EventResult();
        const makeEntity = stub(EventFactory, 'makeEntity').withArgs(model).returns(entity);
        const makeResult = stub(EventFactory, 'makeResult').withArgs(entity).returns(model);
        const save = stub(EventEntity.prototype, 'save').returns(of(entity).toPromise());
        const instance = new EventRepository();

        let actual: EventResult;

        beforeAll(async () => {
            actual = await instance.insert(model).toPromise();
        });

        it('invokes EventFactory.makeEntity for event model to event entity mapping', async () => {
            assert.calledWith(makeEntity, model);
        });

        it('saves the entity', async () => {
            assert.calledOnce(save);
        });

        it('invokes EventFactory.makeResult for event entity to event result mapping', async () => {
            assert.calledWith(makeResult, entity);
        });

        it('returns object returned by mapper', async () => {
            expect(actual).toEqual(model);
        });
    });

});
