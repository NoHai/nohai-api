import expressGraphql from 'express-graphql';
import * as fs from 'fs';
import { buildSchema, GraphQLSchema } from 'graphql';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Nothing } from '../../../business/models/nothing';
import { IInitializeGraph } from './i-initialize-graph';

export class InitializeGraph implements IInitializeGraph {
    private static buildSchema(): GraphQLSchema {
        const query: any = fs.readFileSync(`${__dirname}/../../graph/Query.gql`).toString();
        const mutation: any = fs.readFileSync(`${__dirname}/../../graph/Mutation.gql`).toString();
        return buildSchema(`${query}${mutation}`);
    }

    private static buildHandler(schema: GraphQLSchema): any {
        return expressGraphql({
            graphiql: true,
            rootValue: { hello: () => 'Hello world!'},
            schema,
        });
    }

    constructor(private readonly express: any) {
    }

    execute(): Observable<Nothing> {
        return of(InitializeGraph.buildSchema())
            .pipe(map((schema) => InitializeGraph.buildHandler(schema)))
            .pipe(tap((graphHandler) => this.express.use('/graphql', graphHandler)))
            .pipe(map(() => new Nothing()));
    }
}
