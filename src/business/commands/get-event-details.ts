import { IGetEventDetails } from './i-get-event-details';
import { Observable, of, from, zip } from 'rxjs';
import { IEventRepository } from '../repositories/i-event-repository';
import { IUserEventsRepository } from '../repositories/i-user-events-repository';
import { map } from 'rxjs/operators';
import { EventDetails } from '../models/results/event-details';

export class GetEventDetails implements IGetEventDetails {
    constructor(private readonly eventRepository: IEventRepository,
                private readonly userEventsRepository: IUserEventsRepository) {

    }

    execute(id: any): Observable<any> {
        const eventFlow = this.eventRepository.getById(id);
        const usersFlow = this.userEventsRepository.get(id);

        return zip(eventFlow, usersFlow)
            .pipe(map((result) => new EventDetails({ event: result[0], userEvents: result[1] })));
    }
}
