import {asClass} from 'awilix';
import {EventRepository} from '../../data/repositories/event-repository';

export const businessRepositories: ReadonlyArray<any> = [
    {eventRepository: asClass(EventRepository).scoped()},
];
