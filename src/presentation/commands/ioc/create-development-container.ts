import { asClass, asFunction, AwilixContainer, createContainer, InjectionMode } from 'awilix';
import { CreateEvent } from '../../../business/commands/create-event';
import { InitializeDatabaseConnection } from '../../../data/commands/initialize-database-connection';
import { DataAutomapper } from '../../../data/mapping/data-automapper';
import { EventRepository } from '../../../data/repositories/event-repository';
import { ICreateContainer } from './i-create-container';

export class CreateDevelopmentContainer implements ICreateContainer {
    private readonly settingsPath: string = `../../../../../setting/${process.env.environment}.json`;

    private readonly settings: ReadonlyArray<any> = [
        { dataSettings: asFunction(() => require(this.settingsPath).data).classic()},
        { presentationSettings: asFunction(() => require(this.settingsPath).presentation).classic()},
    ];

    private readonly mappers: ReadonlyArray<any> = [
        { dataMapper: asClass(DataAutomapper).transient().classic()},
    ];

    private readonly businessCommands: ReadonlyArray<any> = [
        { createEvent: asClass(CreateEvent).transient().classic()},
    ];

    private readonly businessRepositories: ReadonlyArray<any> = [
        { eventRepository: asClass(EventRepository).transient().classic()},
    ];

    private readonly presentationCommands: ReadonlyArray<any> = [
        { initializeDatabaseConnection: asClass(InitializeDatabaseConnection).transient().classic()},
    ];

    private container: AwilixContainer = createContainer({ injectionMode: InjectionMode.CLASSIC});

    execute(): AwilixContainer {
        this.register(this.buildRegistrations());
        return this.container;
    }

    private buildRegistrations(): ReadonlyArray<any> {
        return this.settings
            .concat(this.mappers)
            .concat(this.businessRepositories)
            .concat(this.businessCommands)
            .concat(this.presentationCommands);
    }

    private register(registrations: ReadonlyArray<any>): void {
        registrations.forEach((registration) => this.container.register(registration));
    }
}
