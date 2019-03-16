import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Nothing } from '../../../business/models/nothing';
import { IInitializeDatabaseConnection } from '../../../data/commands/i-initialize-database-connection';
import { IPresentationSettings } from '../../i-presentation-settings';
import { IInitializeGraph } from '../graph/i-initialize-graph';
import { CreateMockContainer } from '../ioc/create-mock-container';
import { ResolveService } from '../ioc/resolve-service';
import { IStartup } from './i-startup';

export class StartupMock implements IStartup {
    private readonly resolveService = new ResolveService(new CreateMockContainer().execute());
    private readonly express: any;
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
            console.log('NoHai application started on mock environment.');
        });
    }

    private get(): void {
        this.express.get('/', (_: any, response: any) => {
            response.send('NoHai application.');
        });
    }
}
