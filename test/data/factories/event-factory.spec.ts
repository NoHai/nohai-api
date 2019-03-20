import { Event as EventEntity } from '../../../src/data/entities/event';
import { EventInput } from '../../../src/business/models/inputs/event-input';
import { EventFactory } from '../../../src/data/factories/event-factory';
import { Event as EventResult } from '../../../src/business/models/results/event';

describe('event-factory', () => {
    describe('makeEntity', () => {
        const input = new EventInput({title: 'Random input title here.'});

        let actual: EventEntity;

        beforeEach(() => {
            actual = EventFactory.makeEntity(input);
        });

        it('title is set', () => {
            expect(actual.title).toEqual(input.title);
        });
    });

    describe('makeResult', () => {
        const entity = new EventEntity({title: 'Random entity title here.'});

        let actual: EventResult;

        beforeEach(() => {
            actual = EventFactory.makeResult(entity);
        });

        it('title is set', () => {
            expect(actual.title).toEqual(entity.title);
        });
    });
});
