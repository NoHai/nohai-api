import { Event as EventModel } from '../../../../src/business/models/results/event';

describe('event', () => {
    const init: Partial<EventModel> = {title: 'Random title here.'};

    let instance: EventModel;

    beforeEach(() => {
        instance = new EventModel(init);
    });

    describe('constructor', () => {
        it('title is set', () => {
            expect(instance.title).toEqual(init.title);
        });
    });
});
