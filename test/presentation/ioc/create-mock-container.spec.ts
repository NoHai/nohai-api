import { AwilixContainer } from 'awilix';
import { CreateMockContainer } from '../../../src/presentation/commands/ioc/create-mock-container';

describe('create-mock-container', () => {
    process.env.environment = 'mock';
    const instance = new CreateMockContainer();

    describe('execute', () => {
        let actual: AwilixContainer;

        beforeEach(() => {
            actual = instance.execute();
        });

        it('IDataSettings is registered', () => {
            actual.resolve('dataSettings');
        });

        it('IPresentationSettings is registered', () => {
            actual.resolve('presentationSettings');
        });

        it('IDataAutomapper is registered', () => {
            actual.resolve('dataMapper');
        });

        it('ICreateEvent is registered', () => {
            actual.resolve('createEvent');
        });

        it('IEventRepository is registered', () => {
            actual.resolve('eventRepository');
        });

        it('IInitializeDatabaseConnection is registered', () => {
            actual.resolve('initializeDatabaseConnection');
        });

        it('express is registered', () => {
            actual.resolve('express');
        });
    });
});
