import { of } from 'rxjs';
import { assert, createStubInstance } from 'sinon';
import { CreateEvent } from '../../../src/business/commands/create-event';
import { UpdateEventInput } from '../../../src/business/models/inputs/update-event-input';
import { Event } from '../../../src/business/models/results/event';
import { EventRepository } from '../../../src/data/repositories/event-repository';

describe('create-event', () => {
    const input = new Event();
    const updateInput = new UpdateEventInput();
    const repository = createStubInstance(EventRepository, { insert: of(input), update: of(updateInput) });
    const instance = new CreateEvent(repository);

    describe('execute', () => {
        it('invokes insert from IEventRepository', async () => {
            await instance.execute(input).toPromise();

            assert.calledWith(repository.insert, input);
        });

        it('returns result from IEventRepository', async () => {
            const actual = await instance.execute(input).toPromise();

            expect(actual).toEqual(input);
        });
    });[]
});
