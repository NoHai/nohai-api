import { EventInput } from '../../../../src/business/models/inputs/event-input';

describe('event-input', () => {
    const init: Partial<EventInput> = {
        title: 'Random title here.',
        description: 'Random description here.',
        location: 'Random location here.',
        sport: 'Random sport here.',
        participantsNumber: 1,
        cost: 1,
    };

    let instance: EventInput;

    beforeEach(() => {
        instance = new EventInput(init);
    });

    describe('constructor', () => {
        it('#title is set', () => {
            expect(instance.title).toEqual(init.title);
        });

        it('#description is set', () => {
            expect(instance.description).toEqual(init.description);
        });

        it('#location is set', () => {
            expect(instance.location).toEqual(init.location);
        });

        it('#sport is set', () => {
            expect(instance.sport).toEqual(init.sport);
        });

        it('#participantsNumber is set', () => {
            expect(instance.participantsNumber).toEqual(init.participantsNumber);
        });

        it('#cost is set', () => {
            expect(instance.cost).toEqual(init.cost);
        });
    });
});
