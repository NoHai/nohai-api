import expressGraphql from 'express-graphql';
import * as fs from 'fs';
import { buildSchema, GraphQLSchema } from 'graphql';
import { Nothing } from '../../../business/models/nothing';
import { IInitializeDatabaseConnection } from '../../../data/commands/i-initialize-database-connection';
import { IPresentationSettings } from '../../i-presentation-settings';
import { CreateMockContainer } from '../ioc/create-mock-container';
import { ResolveService } from '../ioc/resolve-service';
import { IStartup } from './i-startup';

export class StartupMock implements IStartup {
    private readonly resolveService = new ResolveService(new CreateMockContainer().execute());
    private readonly express: any;
    private readonly presentationSettings: IPresentationSettings;
    private readonly initializeDatabase: IInitializeDatabaseConnection;

    constructor() {
        this.express = this.resolveService.execute('express');
        this.presentationSettings = this.resolveService.execute('presentationSettings');
        this.initializeDatabase = this.resolveService.execute('initializeDatabaseConnection');
    }

    execute(): Nothing {
        this.initializeDatabase.execute().subscribe();


        const query: any = fs.readFileSync(`${__dirname}/../../graph/Query.gql`).toString();
        const mutation: any = fs.readFileSync(`${__dirname}/../../graph/Mutation.gql`).toString();
        const schema: GraphQLSchema = buildSchema(`${query}${mutation}`);

        const graphHandler: any = expressGraphql({
            graphiql: true,
            rootValue: { hello: () => 'Hello world!'},
            schema,
        });

        this.express.listen(this.presentationSettings.port, () => {
            console.log('NoHai application started on mock environment.');
        });

        this.express.use('/graphql', graphHandler);

        this.express.get('/', (_: any, response: any) => {
            response.send('NoHai application.');
        });

        return new Nothing();
    }
}
