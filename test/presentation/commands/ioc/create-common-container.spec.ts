import { AwilixContainer } from 'awilix';
import { CreateCommonContainer } from '../../../../src/presentation/commands/ioc/create-common-container';

describe('create-common-container', () => {
    process.env.environment = 'mock';
    const instance = new CreateCommonContainer();

    describe('execute', () => {
        let actual: AwilixContainer;

        beforeEach(() => {
            actual = instance.execute();
        });

        it('ICreateUser is registered', () => {
            actual.resolve('createUser');
        });

        it('ICreateEvent is registered', () => {
            actual.resolve('createEvent');
        });

        it('ICreateNotification is registered', () => {
            actual.resolve('createNotification');
        });

        it('IGetNotifications is registered', () => {
            actual.resolve('getNotifications');
        });

        it('IEventRepository is registered', () => {
            actual.resolve('eventRepository');
        });

        it('IUserRepository is registered', () => {
            actual.resolve('userRepository');
        });

        it('INotificationRepository is registered', () => {
            actual.resolve('notificationRepository');
        });

        it('IInitializeDatabaseConnection is registered', () => {
            actual.resolve('initializeDatabaseConnection');
        });

        it('initializeGraph is registered', () => {
            actual.resolve('initializeGraph');
        });

        it('express is registered', () => {
            actual.resolve('express');
        });

        it('createConnection is registered', () => {
            actual.resolve('createConnection');
        });

        it('createDatabase is registered', () => {
            actual.resolve('createDatabase');
        });
    });
});
