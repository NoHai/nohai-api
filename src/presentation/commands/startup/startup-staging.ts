import { Observable, of } from 'rxjs';
import { Nothing } from '../../../business/models/nothing';
import { IInitializeDatabaseConnection } from '../../../data/commands/i-initialize-database-connection';
import { IPresentationSettings } from '../../i-presentation-settings';
import { CreateStagingContainer } from '../ioc/create-staging-container';
import { ResolveService } from '../ioc/resolve-service';
import { IStartup } from './i-startup';

export class StartupStaging implements IStartup {
    private readonly express: any;
    private readonly resolveService = new ResolveService(new CreateStagingContainer().execute());
    private readonly presentationSettings: IPresentationSettings;
    private readonly initializeDatabase: IInitializeDatabaseConnection;

    constructor() {
        this.express = this.resolveService.execute('express');
        this.presentationSettings = this.resolveService.execute('presentationSettings');
        this.initializeDatabase = this.resolveService.execute('initializeDatabaseConnection');
    }

    execute(): Observable<Nothing> {
        this.initializeDatabase.execute().subscribe();

        this.express.listen(this.presentationSettings.port, () => {
            console.log('NoHai application started on staging environment.');
        });

        this.express.get('/', (_: any, response: any) => {
            response.send('NoHai application.');
        });

        return of(new Nothing());
    }
}
