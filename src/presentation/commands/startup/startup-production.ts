import express from 'express';
import { Nothing } from '../../../business/models/nothing';
import { IInitializeDatabaseConnection } from '../../../data/commands/i-initialize-database-connection';
import { IPresentationSettings } from '../../i-presentation-settings';
import { CreateProductionContainer } from '../ioc/create-production-container';
import { ResolveService } from '../ioc/resolve-service';
import { IStartup } from './i-startup';

export class StartupProduction implements IStartup {
    private readonly express = express();
    private readonly resolveService = new ResolveService(new CreateProductionContainer().execute());
    private readonly presentationSettings: IPresentationSettings;
    private readonly initializeDatabase: IInitializeDatabaseConnection;

    constructor() {
        this.presentationSettings = this.resolveService.execute('presentationSettings');
        this.initializeDatabase = this.resolveService.execute('initializeDatabaseConnection');
    }

    execute(): Nothing {
        this.initializeDatabase.execute().subscribe();

        this.express.listen(this.presentationSettings.port, () => {
            console.log('NoHai application started on production environment.');
        });

        this.express.get('/', (_, response: any) => {
            response.send('NoHai application.');
        });

        return new Nothing();
    }
}
