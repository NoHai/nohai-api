import {asClass, AwilixContainer} from 'awilix';
import {CreateEvent} from '../../business/commands/create-event';

export const businessCommands: ReadonlyArray<any> = [
    {createEvent: asClass(CreateEvent).scoped()},
];
