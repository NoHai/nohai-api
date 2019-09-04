import { Event as EventEntity } from '../../../src/data/entities/event';
import { EventInput } from '../../../src/business/models/inputs/event-input';
import { EventFactory } from '../../../src/data/factories/event-factory';
import { Event as EventResult } from '../../../src/business/models/results/event';
import { UpdateEventInput } from '../../../src/business/models/inputs/update-event-input';
import { Sport } from '../../../src/data/entities/sport';
import { Address } from '../../../src/data/entities/address';

describe('event-factory', () => {
    const sport = new Sport();
    sport.name = 'Random sport here';

    const address = new Address();
    address.streetName = 'Random street name here';

    describe('fromEventInput', () => {
        const input = new EventInput({ title: 'Random input title here.', address, sport});

        let actual: EventEntity;

        beforeEach(() => {
            actual = EventFactory.entity.fromEventInput(input);
        });

        it('title is set', () => {
            console.log(actual);
            expect(actual.title).toEqual(input.title);
        });
    });

    describe('fromUpdateEventInput', () => {
        const updateInput = new UpdateEventInput({ title: 'Random input title here.', address, sport});

        let actual: EventEntity;

        beforeEach(() => {
            actual = EventFactory.entity.fromUpdateEventInput(updateInput);
        });

        it('title is set', () => {
            expect(actual.title).toEqual(updateInput.title);
        });
    });

    describe('fromEventEntity', () => {
        const entity = new EventEntity({ title: 'Random entity title here.', address, sport});

        let actual: EventResult;

        beforeEach(() => {
            actual = EventFactory.result.fromEventEntity(entity);
        });

        it('title is set', () => {
            expect(actual.title).toEqual(entity.title);
        });
    });

    describe('fromEventEntities', () => {
        const entities = [new EventEntity({ title: 'Random entity title here.', address, sport})];

        let actual: EventResult [];

        beforeEach(() => {
            actual = EventFactory.results.fromEventEntities(entities);
        });

        it('title is set', () => {
            expect(actual[0].title).toEqual(entities[0].title);
        });
    });
});
