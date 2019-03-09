import { of } from 'rxjs';
import { Event as EventEntity } from '../../../src/data/entities/event';
import { Event as EventModel } from '../../../src/business/models/event';
import { assert, stub } from 'sinon';
import { DataAutomapper } from '../../../src/data/mapping/data-automapper';
import { EventRepository } from '../../../src/data/repositories/event-repository';

describe('event-repository', () => {

    describe('insert', () => {
        const eventEntity = new EventEntity();
        const eventModel = new EventModel();
        const map = stub(DataAutomapper.prototype, 'map').returns(of(eventEntity));
        const save = stub(EventEntity.prototype, 'save').returns(of(eventEntity).toPromise());
        const instance = new EventRepository(new DataAutomapper());

        let actual: EventModel;

        beforeAll(async () => {
            actual = await instance.insert(eventModel).toPromise();
        });

        it('invokes data mapper for event model to event entity', async () => {
            assert.calledWith(map, eventModel);
        });

        it('saves the entity', async () => {
            assert.calledOnce(save);
        });

        it('invokes data mapper for event entity to event model', async () => {
            assert.calledWith(map, eventEntity);
        });

        it('returns object returned by mapper', async () => {
            expect(actual).toEqual(eventModel);
        });
    });

});
