import { of } from 'rxjs';
import { CreateEvent } from '../../../src/business/commands/create-event';
import { createStubInstance, assert } from 'sinon';
import { EventRepository } from '../../../src/data/repositories/event-repository';
import { Event } from '../../../src/business/models/event';

describe('create-event', () => {
    const model = new Event();
    const repository = createStubInstance(EventRepository, {insert: of(model)});
    const instance = new CreateEvent(repository);

    describe('execute', () => {
        it('invokes insert from IEventRepository', async () => {
            await instance.execute(model).toPromise();

            assert.calledWith(repository.insert, model);
        });

        it('returns result from IEventRepository', async () => {
            const actual = await instance.execute(model).toPromise();

            expect(actual).toEqual(model);
        });
    });
});
