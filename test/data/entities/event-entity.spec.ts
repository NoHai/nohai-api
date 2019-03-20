import { Event as EventEntity } from '../../../src/data/entities/event';

describe('event', () => {
    const init: Partial<EventEntity> = {
        id: 'Random id here.',
        title: 'Random title here.'
    };

    let instance: EventEntity;

    beforeEach(() => {
        instance = new EventEntity(init);
    });

    describe('constructor', () => {
        it('id is set', () => {
            expect(instance.id).toEqual(init.id);
        });

        it('title is set', () => {
            expect(instance.title).toEqual(init.title);
        });
    });
});
