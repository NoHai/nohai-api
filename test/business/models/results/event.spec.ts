import { Event as EventModel } from '../../../../src/business/models/results/event';
import { Address } from '../../../../src/data/entities/address';
import { Sport } from '../../../../src/data/entities/sport';

describe('event', () => {
    const sport = new Sport();
    sport.name = 'Random sport here';

    const address = new Address();
    address.streetName = 'Random street name here';

    const init: Partial<EventModel> = {
        title: 'Random title here.',
        description: 'Random description here.',
        address,
        sport,
        freeSpots: 1,
        cost: 1,
    };

    let instance: EventModel;

    beforeEach(() => {
        instance = new EventModel(init);
    });

    describe('constructor', () => {
        it('#title is set', () => {
            expect(instance.title).toEqual(init.title);
        });

        it('#description is set', () => {
            expect(instance.description).toEqual(init.description);
        });

        it('#address is set', () => {
            expect(instance.address).toEqual(init.address);
        });

        it('#sport is set', () => {
            expect(instance.sport).toEqual(init.sport);
        });

        it('#freeSpots is set', () => {
            expect(instance.freeSpots).toEqual(init.freeSpots);
        });

        it('#cost is set', () => {
            expect(instance.cost).toEqual(init.cost);
        });
    });
});
