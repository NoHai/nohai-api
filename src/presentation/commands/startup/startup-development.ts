import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Nothing } from '../../../business/models/nothing';
import { IInitializeDatabaseConnection } from '../../../data/commands/i-initialize-database-connection';
import { IPresentationSettings } from '../../i-presentation-settings';
import { IInitializeGraph } from '../graph/i-initialize-graph';
import { CreateDevelopmentContainer } from '../ioc/create-development-container';
import { ResolveService } from '../ioc/resolve-service';
import { IStartup } from './i-startup';

export class StartupDevelopment implements IStartup {
    private readonly express: any;
    private readonly resolveService = new ResolveService(new CreateDevelopmentContainer().execute());
    private readonly presentationSettings: IPresentationSettings;
    private readonly initializeDatabase: IInitializeDatabaseConnection;
    private readonly initializeGraph: IInitializeGraph;

    constructor() {
        this.express = this.resolveService.execute('express');
        this.presentationSettings = this.resolveService.execute('presentationSettings');
        this.initializeDatabase = this.resolveService.execute('initializeDatabaseConnection');
        this.initializeGraph = this.resolveService.execute('initializeGraph');
    }

    execute(): Observable<Nothing> {
        return this.initializeDatabase.execute()
            .pipe(switchMap(() => this.initializeGraph.execute()))
            .pipe(tap(() => this.listen()))
            .pipe(tap(() => this.get()));
    }

    private listen(): void {
        this.express.listen(this.presentationSettings.port, () => {
            console.log('NoHai application started on dev environment.');
        });
    }

    private get(): void {
        this.express.get('/', (_: any, response: any) => {
            response.send('NoHai application.');
        });
    }
}
