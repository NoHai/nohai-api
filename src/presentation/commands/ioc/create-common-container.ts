import { asClass, asFunction, AwilixContainer, createContainer, InjectionMode } from 'awilix';
import express from 'express';
import { createConnection } from 'typeorm';
import { CreateEvent } from '../../../business/commands/create-event';
import { CreateTokens } from '../../../business/commands/create-tokens';
import { CreateUser } from '../../../business/commands/create-user';
import { GetEventById } from '../../../business/commands/get-event-by-id';
import { GetSports } from '../../../business/commands/get-sports';
import { UpdateUser } from '../../../business/commands/update-user';
import { CreateDatabase } from '../../../data/commands/create-database';
import { CreatePagination } from '../../../data/commands/create-pagination';
import { InitializeDatabaseConnection } from '../../../data/commands/initialize-database-connection';
import { EventRepository } from '../../../data/repositories/event-repository';
import { SportRepository } from '../../../data/repositories/sport-repository';
import { TokensRepository } from '../../../data/repositories/tokens-repository';
import { UserRepository } from '../../../data/repositories/user-repository';
import { InitializeGraph } from '../graph/initialize-graph';
import { ICreateContainer } from './i-create-container';
import { CreateNotification } from '../../../business/commands/create-notification';
import { GetNotifications } from '../../../business/commands/get-notifications';
import { NotificationRepository } from '../../../data/repositories/notification-repository';
import { CreateNotificationToken } from '../../../business/commands/create-notification-token';
import { GetNotificationTokens } from '../../../business/commands/get-notification-tokens';
import { NotificationTokenRepository } from '../../../data/repositories/notification-token-repository';
import { DeleteNotificationToken } from '../../../business/commands/delete-notification-token';
import { UserEventsRepository } from '../../../data/repositories/user-events-repository';
import { GetUserById } from '../../../business/commands/get-user-by-id';
import { UserContext } from '../../../utilities/user-context';
import { CreateUserContext } from '../graph/create-user-context';
import { JoinEvent } from '../../../business/commands/join-event';
import { RefreshToken } from '../../../business/commands/refresh-token';
import { LoginFacebook } from '../../../business/commands/login-facebook';
import { ApproveRequest } from '../../../business/commands/approve-request';
import { RejectRequest } from '../../../business/commands/reject-request';
import { GetCities } from '../../../business/commands/get-cities';
import { GetCounties } from '../../../business/commands/get-counties';
import { CityRepository } from '../../../data/repositories/city-repository';
import { CountyRepository } from '../../../data/repositories/county-repository';
import { MarkAsRead } from '../../../business/commands/mark-as-read';
import { MarkAllAsRead } from '../../../business/commands/mark-all-as-read';
import { GetEventDetails } from '../../../business/commands/get-event-details';
import { EmailService } from '../../../services/email-service';
import { RecoverPassword } from '../../../business/commands/recover-password';
import { UpdateCredentials } from '../../../business/commands/update-credentials';
import { AuthController } from '../../../controllers/auth.controller';
import { CancelEvent } from '../../../business/commands/cancel-event';
import { LeaveEvent } from '../../../business/commands/leave-event';
import { KickoutUser } from '../../../business/commands/kickout-user';
import { CancelPendingRequest } from '../../../business/commands/cancel-pending-request';
import { SearchEvents } from '../../../business/commands/search-events';
import { SaveEvent } from '../../../business/commands/save-event';
import { UpdateEvent } from '../../../business/commands/update-event';
import { ActivateUser } from '../../../business/commands/activate-user';
import { ResendActivationEmail } from '../../../business/commands/resend-activation-email';
import { SaveUserDetails } from '../../../business/commands/save-user-details';
import { CommentRepository } from '../../../data/repositories/comment-repository';
import { CreateComment } from '../../../business/commands/create-comment';

export class CreateCommonContainer implements ICreateContainer {
    private readonly dataDatabaseConnection: ReadonlyArray<any> = [
        { createConnection: asFunction(() => createConnection).transient().classic() },
    ];

    private readonly dataCommands: ReadonlyArray<any> = [
        { initializeDatabaseConnection: asClass(InitializeDatabaseConnection).transient().classic() },
        { createDatabase: asClass(CreateDatabase).transient().classic() },
        { createPagination: asClass(CreatePagination).transient().classic() },
    ];

    private readonly businessCommands: ReadonlyArray<any> = [
        { createComment: asClass(CreateComment).transient().classic() },
        { createEvent: asClass(CreateEvent).transient().classic() },
        { createUser: asClass(CreateUser).transient().classic() },
        { createTokens: asClass(CreateTokens).transient().classic() },
        { updateEvent: asClass(UpdateEvent).transient().classic() },
        { updateUser: asClass(UpdateUser).transient().classic() },
        { eventById: asClass(GetEventById).transient().classic() },
        { events: asClass(SearchEvents).transient().classic() },
        { eventDetails: asClass(GetEventDetails).transient().classic() },
        { sports: asClass(GetSports).transient().classic() },
        { createNotification: asClass(CreateNotification).transient().classic() },
        { getNotifications: asClass(GetNotifications).transient().classic() },
        { createNotificationToken: asClass(CreateNotificationToken).transient().classic() },
        { getNotificationTokens: asClass(GetNotificationTokens).transient().classic() },
        { deleteNotificationToken: asClass(DeleteNotificationToken).transient().classic() },
        { joinEvent: asClass(JoinEvent).transient().classic() },
        { getUserById: asClass(GetUserById).transient().classic() },
        { refreshToken: asClass(RefreshToken).transient().classic() },
        { loginFacebook: asClass(LoginFacebook).transient().classic() },
        { approveRequest: asClass(ApproveRequest).transient().classic() },
        { rejectRequest: asClass(RejectRequest).transient().classic() },
        { cities: asClass(GetCities).transient().classic() },
        { counties: asClass(GetCounties).transient().classic() },
        { markAsRead: asClass(MarkAsRead).transient().classic() },
        { markAllAsRead: asClass(MarkAllAsRead).transient().classic() },
        { recoverPassword: asClass(RecoverPassword).transient().classic() },
        { updateCredentials: asClass(UpdateCredentials).transient().classic() },
        { cancelEvent: asClass(CancelEvent).transient().classic() },
        { leaveEvent: asClass(LeaveEvent).transient().classic() },
        { kickoutUser: asClass(KickoutUser).transient().classic() },
        { cancelPendingRequest: asClass(CancelPendingRequest).transient().classic() },
        { saveEvent: asClass(SaveEvent).transient().classic() },
        { activateUser: asClass(ActivateUser).transient().classic() },
        { resendActivationEmail: asClass(ResendActivationEmail).transient().classic() },
        { saveUserDetails: asClass(SaveUserDetails).transient().classic() },
    ];

    private readonly businessRepositories: ReadonlyArray<any> = [
        { eventRepository: asClass(EventRepository).transient().classic() },
        { userRepository: asClass(UserRepository).transient().classic() },
        { tokensRepository: asClass(TokensRepository).transient().classic() },
        { sportRepository: asClass(SportRepository).transient().classic() },
        { notificationRepository: asClass(NotificationRepository).transient().classic() },
        { notificationTokenRepository: asClass(NotificationTokenRepository).transient().classic() },
        { userEventsRepository: asClass(UserEventsRepository).transient().classic() },
        { cityRepository: asClass(CityRepository).transient().classic() },
        { countyRepository: asClass(CountyRepository).transient().classic() },
        { commentRepository: asClass(CommentRepository).transient().classic() },
    ];

    private readonly presentationCommands: ReadonlyArray<any> = [
        { initializeGraph: asClass(InitializeGraph).transient().classic() },
        { userContext: asClass(UserContext).scoped().classic() },
        { createUserContext: asClass(CreateUserContext).scoped().classic() },
    ];


    private readonly presentationNetworking: ReadonlyArray<any> = [
        { express: asFunction(() => express()).singleton().classic() },
    ];

    private readonly providers: ReadonlyArray<any> = [
        { emailService: asClass(EmailService).singleton().classic() },
        { authController: asClass(AuthController).singleton().classic() },
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
            .concat(this.presentationNetworking)
            .concat(this.providers);
    }
}
