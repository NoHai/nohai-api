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
import { IDeleteUserEvents } from '../../../business/commands/i-delete-user-events';
import { IGetUserById } from '../../../business/commands/i-get-user-by-id';
import { UserContext } from '../../../utilities/user-context';
import { ICreateUserContext } from './i-create-user-context';
import { IJoinEvent } from '../../../business/commands/i-join-event';
import { IRefreshToken } from '../../../business/commands/i-refresh-token';

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
                private readonly sports: IGetSports,
                private readonly createNotification: ICreateNotification,
                private readonly getNotifications: IGetNotifications,
                private readonly createNotificationToken: ICreateNotificationToken,
                private readonly getNotificationTokens: IGetNotificationTokens,
                private readonly deleteNotificationToken: IDeleteNotificationToken,
                private readonly joinEvent: IJoinEvent,
                private readonly deleteUserEvents: IDeleteUserEvents,
                private readonly getUserById: IGetUserById,
                private readonly createUserContext: ICreateUserContext,
                private readonly refreshToken: IRefreshToken,
                private userContext: UserContext,
    ) {
    }

    execute(): Observable<Nothing> {
        return of(InitializeGraph.buildSchema())
            .pipe(map((schema) => this.buildHandler(schema)))
            .pipe(tap(() => this.express.use(cors({ origin: '*' }))))
            .pipe(tap((graphHandler) => this.express.use('/graphql', graphHandler)))
            .pipe(map(() => new Nothing()));
    }

    private buildHandler(schema: GraphQLSchema): any {
        return expressGraphql((request) => {
            this.createUserContext.execute(request.headers).subscribe();
            return {
                graphiql: true,
                rootValue: {
                    auth: (context: any) => this.createTokens.execute(context.input).toPromise(),
                    createEvent: (context: any) => this.createEvent.execute(context.input).toPromise(),
                    createUser: (context: any) => this.createUser.execute(context.input).toPromise(),
                    eventById: (context: any) => this.eventById.execute(context).toPromise(),
                    events: (context: any) => this.events.execute(context.parameter).toPromise(),
                    sports: (context: any) => this.sports.execute(context.input).toPromise(),
                    updateEvent: (context: any) => this.createEvent.execute(context.input).toPromise(),
                    updateUser: (context: any) => this.updateUser.execute(context.input).toPromise(),
                    createNotification: (context: any) => this.createNotification.execute(context.input).toPromise(),
                    getNotifications: (context: any) => this.getNotifications.execute(context.parameter).toPromise(),
                    createNotificationToken: (context: any) => this.createNotificationToken.execute(context.token).toPromise(),
                    getNotificationTokens: (context: any) => this.getNotificationTokens.execute(context.userId).toPromise(),
                    deleteNotificationToken: (context: any) => this.deleteNotificationToken.execute(context).toPromise(),
                    joinEvent: (context: any) => this.joinEvent.execute(context.eventId).toPromise(),
                    deleteUserEvents: (context: any) => this.deleteUserEvents.execute(context).toPromise(),
                    getUserById: (context: any) => this.getUserById.execute(context).toPromise(),
                    refreshToken: (context: any) => this.refreshToken.execute(context.input).toPromise(),
                },
                schema,
                context: {
                    authToken: request.headers.authorization,
                },
            };
        });
    }
}
