import { asClass, asFunction, AwilixContainer, createContainer, InjectionMode } from 'awilix';
import { ICommand } from '../../../business/commands/core/i-command';
import { CreateEvent } from '../../../business/commands/create-event';
import { Nothing } from '../../../business/models/nothing';
import { InitializeDatabaseConnection } from '../../../data/commands/initialize-database-connection';
import { DataAutomapper } from '../../../data/mapping/data-automapper';
import { EventRepository } from '../../../data/repositories/event-repository';

export class CreateContainer implements ICommand<Nothing, AwilixContainer> {
    private readonly dataSettings: ReadonlyArray<any> = [
        { dataSettings: asFunction(() => require(`../../../../setting/${process.env.environment}.json`).data).classic() },
    ];

    private readonly dataAutomapper: ReadonlyArray<any> = [
        { mapper: asClass(DataAutomapper).transient().classic() },
    ];

    private readonly businessCommands: ReadonlyArray<any> = [
        { createEvent: asClass(CreateEvent).transient().classic() },
    ];

    private readonly businessRepositories: ReadonlyArray<any> = [
        { eventRepository: asClass(EventRepository).transient().classic() },
    ];

    private readonly presentationCommands: ReadonlyArray<any> = [
        { initializeDatabaseConnection: asClass(InitializeDatabaseConnection).transient().classic() },
    ];

    private container: AwilixContainer = createContainer({ injectionMode: InjectionMode.CLASSIC });

    execute(): AwilixContainer {
        this.register(this.buildRegistrations());
        return this.container;
    }

    private buildRegistrations(): ReadonlyArray<any> {
        return this.dataSettings
            .concat(this.dataAutomapper)
            .concat(this.businessRepositories)
            .concat(this.businessCommands)
            .concat(this.presentationCommands);
    }

    private register(registrations: ReadonlyArray<any>): void {
        registrations.forEach((registration) => this.container.register(registration));
    }
}
