import { asClass, asFunction, asValue, AwilixContainer, createContainer, InjectionMode } from 'awilix';
import express from 'express';
import { createConnection } from 'typeorm';
import { CreateEvent } from '../../../business/commands/create-event';
import { CreateTokens } from '../../../business/commands/create-tokens';
import { CreateUser } from '../../../business/commands/create-user';
import { GetEventById } from '../../../business/commands/get-event-by-id';
import { GetEvents } from '../../../business/commands/get-events';
import { GetSports } from '../../../business/commands/get-sports';
import { UpdateUser } from '../../../business/commands/update-user';
import { CreateDatabase } from '../../../data/commands/create-database';
import { InitializeDatabaseConnection } from '../../../data/commands/initialize-database-connection';
import { EventRepository } from '../../../data/repositories/event-repository';
import { SportRepository } from '../../../data/repositories/sport-repository';
import { TokensRepository } from '../../../data/repositories/tokens-repository';
import { UserRepository } from '../../../data/repositories/user-repository';
import { InitializeGraph } from '../graph/initialize-graph';
import { ICreateContainer } from './i-create-container';

export class CreateCommonContainer implements ICreateContainer {
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
        { createTokens: asClass(CreateTokens).transient().classic() },
        { updateUser: asClass(UpdateUser).transient().classic() },
        { eventById: asClass(GetEventById).transient().classic() },
        { events: asClass(GetEvents).transient().classic() },
        { sports: asClass(GetSports).transient().classic() },
    ];

    private readonly businessRepositories: ReadonlyArray<any> = [
        { eventRepository: asClass(EventRepository).transient().classic() },
        { userRepository: asClass(UserRepository).transient().classic() },
        { tokensRepository: asClass(TokensRepository).transient().classic() },
        { sportRepository: asClass(SportRepository).transient().classic() },
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
        return this.dataDatabaseConnection
            .concat(this.dataCommands)
            .concat(this.businessRepositories)
            .concat(this.businessCommands)
            .concat(this.presentationCommands)
            .concat(this.presentationNetworking);
    }
}
