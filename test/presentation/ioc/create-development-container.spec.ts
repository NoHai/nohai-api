import { AwilixContainer } from 'awilix';
import { CreateDevelopmentContainer } from '../../../src/presentation/commands/ioc/create-development-container';

describe('create-development-container', () => {
    process.env.environment = 'development';
    const instance = new CreateDevelopmentContainer();

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
