import { of } from 'rxjs';
import { assert, stub } from 'sinon';
import { EventInput } from '../../../src/business/models/inputs/event-input';
import { Event as EventResult } from '../../../src/business/models/results/event';
import { CreatePagination } from '../../../src/data/commands/create-pagination';
import { Event as EventEntity } from '../../../src/data/entities/event';
import { EventFactory } from '../../../src/data/factories/event-factory';
import { EventRepository } from '../../../src/data/repositories/event-repository';
import { UserContext } from '../../../src/utilities/user-context';
import { Address } from '../../../src/data/entities/address';
import { Sport } from '../../../src/data/entities/sport';

describe('event-repository', () => {

    describe('insert', () => {
        const userId = '';
        const entity = new EventEntity({ address: new Address({ id: ''}), sport: new Sport({ id: ''})});
        const model = new EventResult({ address: new Address({ id: ''}), sport: new Sport({ id: ''})});
        const input = new EventInput({ address: new Address({ id: ''}), sport: new Sport({ id: ''})});
        const fromEventInput = stub(EventFactory.entity, 'fromEventInput').withArgs(input, '').returns(entity);
        const fromEventEntity = stub(EventFactory.result, 'fromEventEntity').withArgs(entity).returns(model);
        const save = stub(EventEntity.prototype, 'save').returns(of(entity).toPromise());
        const createPagination = new CreatePagination();
        const userContext = new UserContext();
        userContext.userId = userId;
        const instance = new EventRepository(createPagination, userContext);

        let actual: EventResult;

        beforeAll(async () => {
            actual = await instance.insert(input).toPromise();
        });

        it('invokes EventFactory.entity.fromEventInput for event model to event entity mapping', async () => {
            assert.calledWith(fromEventInput, input, userId);
        });

        it('saves the entity', async () => {
            assert.calledOnce(save);
        });

        it('invokes EventFactory.result.fromEventEntity for event entity to event result mapping', async () => {
            assert.calledWith(fromEventEntity, entity);
        });

        it('returns object returned by mapper', async () => {
            expect(actual).toEqual(model);
        });
    });

});
