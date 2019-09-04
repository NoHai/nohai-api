import { EventInput } from '../../../../src/business/models/inputs/event-input';
import { Sport } from '../../../../src/data/entities/sport';
import { Address } from '../../../../src/data/entities/address';

describe('event-input', () => {
    const sport = new Sport();
    sport.name = 'Randome sport here';

    const address = new Address();
    address.streetName = 'Randome street name here';

    const init: Partial<EventInput> = {
        title: 'Random title here.',
        description: 'Random description here.',
        address,
        sport,
        freeSpots: 1,
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

        it('#freeSpots is set', () => {
            expect(instance.freeSpots).toEqual(init.freeSpots);
        });

        it('#sport is set', () => {
            expect(instance.sport).toEqual(init.sport);
        });

        it('#level is set', () => {
            expect(instance.level).toEqual(init.level);
        });

        it('#address is set', () => {
            expect(instance.address).toEqual(init.address);
        });

        it('#cost is set', () => {
            expect(instance.cost).toEqual(init.cost);
        });
    });
});
