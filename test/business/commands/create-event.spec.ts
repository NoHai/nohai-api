import { of } from 'rxjs';
import { CreateEvent } from '../../../src/business/commands/create-event';
import { createStubInstance, assert } from 'sinon';
import { EventInput } from '../../../src/business/models/inputs/event-input';
import { EventRepository } from '../../../src/data/repositories/event-repository';

describe('create-event', () => {
    const input = new EventInput();
    const repository = createStubInstance(EventRepository, {insert: of(input)});
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
    });
});
