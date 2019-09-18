import { IGetEventDetails } from './i-get-event-details';
import { Observable, of, from, zip } from 'rxjs';
import { IEventRepository } from '../repositories/i-event-repository';
import { IUserEventsRepository } from '../repositories/i-user-events-repository';
import { UserEvents } from '../../data/entities/user-events';

export class GetEventDetails implements IGetEventDetails {
    constructor(private readonly eventRepository: IEventRepository,
                private readonly userEventsRepository: IUserEventsRepository) {

    }

    execute(id: any): Observable<any> {
        console.log(id);
        const eventFlow = this.eventRepository.getById(id);
        console.log(eventFlow);

        const usersFlow = this.userEventsRepository.get(id);

        return zip(eventFlow, usersFlow);
    }
}
