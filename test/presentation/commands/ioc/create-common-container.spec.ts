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

        it('IGetUserById is registered', () => {
            actual.resolve('getUserById');
        });

        it('ICreateTokens is registered', () => {
            actual.resolve('createTokens');
        });

        it('IUpdateUser is registered', () => {
            actual.resolve('updateUser');
        });

        it('IGetEventById is registered', () => {
            actual.resolve('eventById');
        });

        it('ICreateEvent is registered', () => {
            actual.resolve('createEvent');
        });

        it('IGetEvents is registered', () => {
            actual.resolve('events');
        });

        it('ISports is registered', () => {
            actual.resolve('sports');
        });

        it('ICreateNotification is registered', () => {
            actual.resolve('createNotification');
        });

        it('IGetNotifications is registered', () => {
            actual.resolve('getNotifications');
        });

        it('ICreateNotificationToken is registered', () => {
            actual.resolve('createNotificationToken');
        });

        it('IGetNotificationTokens is registered', () => {
            actual.resolve('getNotificationTokens');
        });

        it('IDeleteNotificationToken is registered', () => {
            actual.resolve('deleteNotificationToken');
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

        it('ITokensRepository is registered', () => {
            actual.resolve('tokensRepository');
        });

        it('ISportRepository is registered', () => {
            actual.resolve('sportRepository');
        });

        it('INotificationTokenRepository is registered', () => {
            actual.resolve('notificationTokenRepository');
        });

        it('IUserEventsRepository is registered', () => {
            actual.resolve('userEventsRepository');
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
