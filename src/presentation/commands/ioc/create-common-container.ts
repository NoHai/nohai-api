import { asClass, asFunction, asValue, AwilixContainer, createContainer, InjectionMode } from 'awilix';
import express from 'express';
import { createConnection } from 'typeorm';
import { CreateEvent } from '../../../business/commands/create-event';
import { CreateUser } from '../../../business/commands/create-user';
import { CreateDatabase } from '../../../data/commands/create-database';
import { InitializeDatabaseConnection } from '../../../data/commands/initialize-database-connection';
import { IDataSettings } from '../../../data/i-data-settings';
import { EventRepository } from '../../../data/repositories/event-repository';
import { IPresentationSettings } from '../../i-presentation-settings';
import { InitializeGraph } from '../graph/initialize-graph';
import { ICreateContainer } from './i-create-container';

export class CreateCommonContainer implements ICreateContainer {
    private readonly settingsPath: string = `../../settings/${process.env.environment}.json`;
    private readonly allSettings: any = require(this.settingsPath);
    private readonly dataSettings: IDataSettings = this.allSettings.data;
    private readonly presentationSettings: IPresentationSettings = this.allSettings.presentation;

    private readonly settings: ReadonlyArray<any> = [
        { dataSettings: asValue(this.dataSettings) },
        { presentationSettings: asValue(this.presentationSettings) },
    ];

    private readonly dataDatabaseConnection: ReadonlyArray<any> = [
        { createConnection: asFunction(() => createConnection).transient().classic() },
    ];

    private readonly dataCommands: ReadonlyArray<any> = [
        { initializeDatabaseConnection: asClass(InitializeDatabaseConnection).transient().classic() },
        { createDatabase: asClass(CreateDatabase).transient().classic() },
    ];

    private readonly businessCommands: ReadonlyArray<any> = [
        { createEvent: asClass(CreateEvent).transient().classic() },
        { createUser: asClass(CreateUser).transient().classic() },
    ];

    private readonly businessRepositories: ReadonlyArray<any> = [
        { eventRepository: asClass(EventRepository).transient().classic() },
    ];

    private readonly presentationCommands: ReadonlyArray<any> = [
        { initializeGraph: asClass(InitializeGraph).transient().classic() },
    ];

    private readonly presentationNetworking: ReadonlyArray<any> = [
        { express: asFunction(() => express()).singleton().classic() },
    ];

    private container: AwilixContainer = createContainer({ injectionMode: InjectionMode.CLASSIC });

    execute(): AwilixContainer {
        this.register(this.buildRegistrations());
        return this.container;
    }

    protected register(registrations: ReadonlyArray<any>): void {
        registrations.forEach((registration) => this.container.register(registration));
    }

    private buildRegistrations(): ReadonlyArray<any> {
        return this.settings
            .concat(this.dataDatabaseConnection)
            .concat(this.dataCommands)
            .concat(this.businessRepositories)
            .concat(this.businessCommands)
            .concat(this.presentationCommands)
            .concat(this.presentationNetworking);
    }
}
