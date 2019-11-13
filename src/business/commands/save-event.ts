import { ISaveEvent } from './i-save-event';
import { EventInput } from '../models/inputs/event-input';
import { Observable } from 'rxjs';
import { Event as EventResult } from '../models/results/event';
import { IUpdateEvent } from './i-update-event';
import { ICreateEvent } from './i-create-event';

export class SaveEvent implements ISaveEvent {
    constructor(private readonly updateEvent: IUpdateEvent,
                private readonly createEvent: ICreateEvent) { }

    execute(input: EventInput): Observable<EventResult> {
        if (input.id) {
            return this.updateEvent.execute(input);
        } else {
            return this.createEvent.execute(input);
        }
    }
}
