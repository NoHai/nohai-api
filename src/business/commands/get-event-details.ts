import { IGetEventDetails } from './i-get-event-details';
import { Observable, of } from 'rxjs';
import { IEventRepository } from '../repositories/i-event-repository';
import { IUserEventsRepository } from '../repositories/i-user-events-repository';
import { Nothing } from '../models/nothing';

export class GetEventDetails implements IGetEventDetails {
    constructor(private readonly eventRepository: IEventRepository,
                private readonly userEventsRepository: IUserEventsRepository) {

    }

    execute(id: any): Observable<any> {
        const eventFlow = this.eventRepository.getById(id);
        const usersFlow = this.userEventsRepository.get(id);
        return of(Nothing);
    }
}
