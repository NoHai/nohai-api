import { IGetEventDetails } from './i-get-event-details';
import { Observable, of, from } from 'rxjs';
import { IEventRepository } from '../repositories/i-event-repository';
import { IUserEventsRepository } from '../repositories/i-user-events-repository';
import { Nothing } from '../models/nothing';
import { map, groupBy } from 'rxjs/operators';
import { UserEvents } from '../../data/entities/user-events';

export class GetEventDetails implements IGetEventDetails {
    constructor(private readonly eventRepository: IEventRepository,
                private readonly userEventsRepository: IUserEventsRepository) {

    }

    execute(id: any): Observable<any> {
        const eventFlow = this.eventRepository.getById(id);
        // const usersFlow = from(UserEvents.find({ eventId: id, relations: ['user']}))

        // this.userEventsRepository.get(id)
        //                     .pipe(map((userEvents) =>  ));
        return of(Nothing);
    }
}
