import {asClass, AwilixContainer, createContainer, InjectionMode} from 'awilix';
import {ICommand} from '../../../business/commands/core/i-command';
import {CreateEvent} from '../../../business/commands/create-event';
import {Nothing} from '../../../business/models/nothing';
import {DataAutomapper} from '../../../data/mapping/data-automapper';
import {EventRepository} from '../../../data/repositories/event-repository';
import {StorageFactory} from '../../../data/storage-factory';

export class CreateContainer implements ICommand<Nothing, AwilixContainer> {
    private businessCommands: ReadonlyArray<any> = [
        {createEvent: asClass(CreateEvent).scoped()},
    ];

    private businessRepositories: ReadonlyArray<any> = [
        {eventRepository: asClass(EventRepository).scoped()},
    ];

    private dataAutomapper: ReadonlyArray<any> = [
        {mapper: asClass(DataAutomapper).classic()},
    ];

    private memoryStorage: ReadonlyArray<any> = [
        {storageFactory: asClass(StorageFactory).singleton()},
    ];

    private container: AwilixContainer = createContainer({injectionMode: InjectionMode.CLASSIC});

    execute(): AwilixContainer {
        this.register(this.buildRegistrations());
        return this.container;
    }

    private buildRegistrations(): ReadonlyArray<any> {
        const registrations: ReadonlyArray<any> = [];

        registrations
            .concat(this.dataAutomapper)
            .concat(this.memoryStorage)
            .concat(this.businessRepositories)
            .concat(this.businessCommands);

        return registrations;
    }

    private register(registrations: ReadonlyArray<any>): void {
        registrations.forEach((registration) => this.container.register(registration));
    }
}
