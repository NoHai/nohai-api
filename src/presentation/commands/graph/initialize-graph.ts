import cors from 'cors';
import expressGraphql from 'express-graphql';
import * as fs from 'fs';
import { buildSchema, GraphQLSchema } from 'graphql';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ICreateEvent } from '../../../business/commands/i-create-event';
import { ICreateTokens } from '../../../business/commands/i-create-tokens';
import { ICreateUser } from '../../../business/commands/i-create-user';
import { IGetEventById } from '../../../business/commands/i-get-event-by-id';
import { IGetEvents } from '../../../business/commands/i-get-events';
import { IGetSports } from '../../../business/commands/i-get-sports';
import { IUpdateUser } from '../../../business/commands/i-update-user';
import { Nothing } from '../../../business/models/nothing';
import { IInitializeGraph } from './i-initialize-graph';
import { ICreateNotification } from '../../../business/commands/i-create-notification';
import { IGetNotifications } from '../../../business/commands/i-get-notifications';
import { ICreateNotificationToken } from '../../../business/commands/i-create-notification-token';
import { IGetNotificationTokens } from '../../../business/commands/i-get-notification-tokens';
import { IDeleteNotificationToken } from '../../../business/commands/i-delete-notification-token';
import { IGetUserById } from '../../../business/commands/i-get-user-by-id';
import { ICreateUserContext } from './i-create-user-context';
import { IJoinEvent } from '../../../business/commands/i-join-event';
import { IRefreshToken } from '../../../business/commands/i-refresh-token';
import { ILoginFacebook } from '../../../business/commands/i-login-facebook';
import { IApproveRequest } from '../../../business/commands/i-approve-request';
import { IRejectRequest } from '../../../business/commands/i-reject-request';
import { IGetCities } from '../../../business/commands/i-get-cities';
import { IGetCounties } from '../../../business/commands/i-get-counties';
import { IMarkAsRead } from '../../../business/commands/i-mark-as-read';
import { IMarkAllAsRead } from '../../../business/commands/i-mark-all-as-read';
import { IGetEventDetails } from '../../../business/commands/i-get-event-details';
import { IRecoverPassword } from '../../../business/commands/i-recover-password';
import { IUpdateCredentials } from '../../../business/commands/i-update-credentials';
import { AuthHelper } from '../../../utilities/auth-helper';
import bodyParser from 'body-parser';
import { ICancelEvent } from '../../../business/commands/i-cancel-event';
import { ILeaveEvent } from '../../../business/commands/i-leave-event';
import { IKickoutUser } from '../../../business/commands/i-kickout-user';
import { ICancelPendingRequest } from '../../../business/commands/i-cancel-pending-request';

export class InitializeGraph implements IInitializeGraph {
    private static readonly rootPath = `${__dirname}/../../graph`;
    private static readonly parametersPath = `${InitializeGraph.rootPath}/parameters`;
    private static readonly inputsPath = `${InitializeGraph.rootPath}/inputs`;
    private static readonly resultsPath = `${InitializeGraph.rootPath}/results`;

    private static buildSchema(): GraphQLSchema {
        const nodes: ReadonlyArray<string> = InitializeGraph.readNodes(InitializeGraph.inputsPath)
            .concat(InitializeGraph.readNodes(InitializeGraph.parametersPath))
            .concat(InitializeGraph.readNodes(InitializeGraph.resultsPath))
            .concat(InitializeGraph.readNodes(InitializeGraph.rootPath));

        return buildSchema(nodes.join());
    }

    private static readNodes(folderPath: string): string[] {
        const nodes: string[] = [];

        fs.readdirSync(folderPath, { withFileTypes: true })
            .filter((file) => file.isFile())
            .forEach((file) => {
                nodes.push(fs.readFileSync(`${folderPath}/${file.name}`).toString());
            });

        return nodes;
    }

    constructor(private readonly express: any,
                private readonly createEvent: ICreateEvent,
                private readonly createUser: ICreateUser,
                private readonly createTokens: ICreateTokens,
                private readonly updateUser: IUpdateUser,
                private readonly eventById: IGetEventById,
                private readonly events: IGetEvents,
                private readonly eventDetails: IGetEventDetails,
                private readonly sports: IGetSports,
                private readonly createNotification: ICreateNotification,
                private readonly getNotifications: IGetNotifications,
                private readonly createNotificationToken: ICreateNotificationToken,
                private readonly getNotificationTokens: IGetNotificationTokens,
                private readonly deleteNotificationToken: IDeleteNotificationToken,
                private readonly joinEvent: IJoinEvent,
                private readonly getUserById: IGetUserById,
                private readonly createUserContext: ICreateUserContext,
                private readonly refreshToken: IRefreshToken,
                private readonly loginFacebook: ILoginFacebook,
                private readonly approveRequest: IApproveRequest,
                private readonly rejectRequest: IRejectRequest,
                private readonly cities: IGetCities,
                private readonly counties: IGetCounties,
                private readonly markAsRead: IMarkAsRead,
                private readonly markAllAsRead: IMarkAllAsRead,
                private readonly recoverPassword: IRecoverPassword,
                private readonly updateCredentials: IUpdateCredentials,
                private readonly cancelEvent: ICancelEvent,
                private readonly leaveEvent: ILeaveEvent,
                private readonly kickoutUser: IKickoutUser,
                private readonly cancelPendingRequest: ICancelPendingRequest,
    ) {
    }

    execute(): Observable<Nothing> {
        return of(InitializeGraph.buildSchema())
            .pipe(map((schema) => this.buildHandler(schema)))
            .pipe(tap(() => this.express.use(cors({ origin: '*' }))))
            .pipe(tap(() => this.express.use(bodyParser.urlencoded({ extended: true }))))
            .pipe(tap(() => this.express.use(bodyParser.json())))
            .pipe(tap((graphHandler) => this.express.use('/graphql', graphHandler)))
            .pipe(map(() => new Nothing()));
    }

    private executer = (expressContext: any, command: any, requiresAuth: boolean = true): any => {
        if (requiresAuth) {
            try {
                if (expressContext.authToken && expressContext.authToken.length > 0) {
                    const auth = expressContext.authToken.replace('Bearer ', '');
                    const decodedToken: any = AuthHelper.verifyToken(auth);
                    if (decodedToken !== undefined) {
                        return command();
                    } else {
                        expressContext.response.status(401);
                    }
                } else {
                    expressContext.response.status(401);
                }
            } catch (err) {
                console.log(err);
            }

        } else {
            return command();
        }
    }

    private buildHandler(schema: GraphQLSchema): any {
        return expressGraphql((request, response) => {
            this.createUserContext.execute(request.headers).subscribe();
            const expContext: any = {
                authToken: request.headers.authorization,
                response,
            };
            return {
                graphiql: true,
                rootValue: {
                    auth: (context: any) => this.executer(expContext, () => this.createTokens.execute(context.input).toPromise(), false),
                    createEvent: (context: any) => this.executer(expContext, () => this.createEvent.execute(context.input).toPromise()),
                    createUser: (context: any) => this.executer(expContext,
                        () => this.createUser.execute(context.input).toPromise(), false),
                    eventById: (context: any) => this.executer(expContext, () => this.eventById.execute(context).toPromise()),
                    events: (context: any) => this.executer(expContext, () => this.events.execute(context.parameter).toPromise()),
                    eventDetails: (context: any) => this.executer(expContext,
                        () => this.eventDetails.execute(context.parameter).toPromise()),
                    sports: (context: any) => this.executer(expContext, () => this.sports.execute(context.input).toPromise()),
                    updateEvent: (context: any) => this.executer(expContext, () => this.createEvent.execute(context.input).toPromise()),
                    updateUser: (context: any) => this.executer(expContext, () => this.updateUser.execute(context.input).toPromise()),
                    createNotification: (context: any) => this.executer(expContext,
                        () => this.createNotification.execute(context.input).toPromise()),
                    getNotifications: (context: any) => this.executer(expContext,
                        () => this.getNotifications.execute(context.parameter).toPromise()),
                    createNotificationToken: (context: any) => this.executer(expContext,
                        () => this.createNotificationToken.execute(context.token).toPromise()),
                    getNotificationTokens: (context: any) => this.executer(expContext,
                        () => this.getNotificationTokens.execute(context.userId).toPromise()),
                    deleteNotificationToken: (context: any) => this.executer(expContext,
                        () => this.deleteNotificationToken.execute(context.id).toPromise()),
                    joinEvent: (context: any) => this.executer(expContext, () => this.joinEvent.execute(context.eventId).toPromise()),
                    getUserById: (context: any) => this.executer(expContext,
                        () => this.getUserById.execute(context.parameter).toPromise(), false),
                    refreshToken: (context: any) => this.executer(expContext,
                        () => this.refreshToken.execute(context.input).toPromise(), false),
                    loginFacebook: (context: any) => this.executer(expContext,
                        () => this.loginFacebook.execute(context.input).toPromise(), false),
                    approveRequest: (context: any) => this.executer(expContext,
                        () => this.approveRequest.execute(context.parameter).toPromise()),
                    rejectRequest: (context: any) => this.executer(expContext,
                        () => this.rejectRequest.execute(context.parameter).toPromise()),
                    cities: (context: any) => this.executer(expContext,
                        () => this.cities.execute(context.parameter).toPromise()),
                    counties: (context: any) => this.executer(expContext,
                        () => this.counties.execute(context.parameter).toPromise()),
                    markAsRead: (context: any) => this.executer(expContext,
                        () => this.markAsRead.execute(context.parameter).toPromise()),
                    markAllAsRead: (context: any) => this.executer(expContext,
                        () => this.markAllAsRead.execute(context).toPromise()),
                    recoverPassword: (context: any) => this.executer(expContext,
                        () => this.recoverPassword.execute(context.parameter).toPromise(), false),
                    updateCredentials: (context: any) => this.executer(expContext,
                        () => this.updateCredentials.execute(context.input).toPromise(), false),
                    cancelEvent: (context: any) => this.executer(expContext,
                        () => this.cancelEvent.execute(context.parameter).toPromise()),
                    leaveEvent: (context: any) => this.executer(expContext,
                        () => this.leaveEvent.execute(context.parameter).toPromise()),
                    kickoutUser: (context: any) => this.executer(expContext,
                        () => this.kickoutUser.execute(context.parameter).toPromise()),
                    cancelPendingRequest: (context: any) => this.executer(expContext,
                            () => this.cancelPendingRequest.execute(context.parameter).toPromise()),
                },
    schema,
    customFormatErrorFn: (err) => {
        return({ message: err.message });
    },
};
        });
    }
}
