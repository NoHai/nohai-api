import { EventInput } from '../../../../src/business/models/inputs/event-input';

describe('event-input', () => {
    const init: Partial<EventInput> = {
        title: 'Random title here.'
    };

    let instance: EventInput;

    beforeEach(() => {
        instance = new EventInput(init);
    });

    describe('constructor', () => {
        it('title is set', () => {
            expect(instance.title).toEqual(init.title);
        });
    });
});
