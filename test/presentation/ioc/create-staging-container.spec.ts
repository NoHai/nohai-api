import { AwilixContainer } from 'awilix';
import { CreateStagingContainer } from '../../../src/presentation/commands/ioc/create-staging-container';

describe('create-staging-container', () => {
    process.env.environment = 'mock';
    const instance = new CreateStagingContainer();

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
    });
});
