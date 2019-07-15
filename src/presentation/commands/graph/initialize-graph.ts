import expressGraphql from 'express-graphql';
import * as fs from 'fs';
import { buildSchema, GraphQLSchema } from 'graphql';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ICreateEvent } from '../../../business/commands/i-create-event';
import { ICreateUser } from '../../../business/commands/i-create-user';
import { Nothing } from '../../../business/models/nothing';
import { IInitializeGraph } from './i-initialize-graph';

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

        fs.readdirSync(folderPath, { withFileTypes: true})
            .filter((file) => file.isFile())
            .forEach((file) => {
                nodes.push(fs.readFileSync(`${folderPath}/${file.name}`).toString());
            });

        return nodes;
    }

    constructor(private readonly express: any,
                private readonly createEvent: ICreateEvent,
                private readonly createUser: ICreateUser) {
    }

    execute(): Observable<Nothing> {
        return of(InitializeGraph.buildSchema())
            .pipe(map((schema) => this.buildHandler(schema)))
            .pipe(tap((graphHandler) => this.express.use('/graphql', graphHandler)))
            .pipe(map(() => new Nothing()));
    }

    private buildHandler(schema: GraphQLSchema): any {
        return expressGraphql({
            graphiql: true,
            rootValue: {
                createEvent: (context: any) => this.createEvent.execute(context.input).toPromise(),
                createUser: (context: any) => this.createUser.execute(context.input).toPromise(),
                updateEvent: (context: any) => this.createEvent.execute(context.input).toPromise(),
            },
            schema,
        });
    }
}
