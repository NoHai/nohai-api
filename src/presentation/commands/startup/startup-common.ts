import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Nothing } from '../../../business/models/nothing';
import { IInitializeDatabaseConnection } from '../../../data/commands/i-initialize-database-connection';
import { IInitializeGraph } from '../graph/i-initialize-graph';
import { ICreateContainer } from '../ioc/i-create-container';
import { ResolveService } from '../ioc/resolve-service';
import { IStartup } from './i-startup';
import { AuthController } from '../../../controllers/auth.controller';

export abstract class StartupCommon implements IStartup {
    protected readonly express: any;
    protected readonly resolveService: ResolveService;
    protected readonly initializeDatabase: IInitializeDatabaseConnection;
    protected readonly initializeGraph: IInitializeGraph;
    private readonly authController: AuthController;

    protected constructor(createContainer: ICreateContainer) {
        this.resolveService = new ResolveService(createContainer.execute());
        this.express = this.resolveService.execute('express');
        this.initializeDatabase = this.resolveService.execute('initializeDatabaseConnection');
        this.initializeGraph = this.resolveService.execute('initializeGraph');
        this.authController = this.resolveService.execute('authController');
    }

    execute(): Observable<Nothing> {
        return this.initializeDatabase.execute()
            .pipe(switchMap(() => this.initializeGraph.execute()))
            .pipe(tap(() => this.listen()))
            .pipe(tap(() => this.routes()));
    }

    private listen(): void {
        this.express.listen(process.env.NOHAI_PORT, () => {
            console.log(this.listenLog);
        });
    }

    private routes(): void {
        this.express.get('/', (_: any, response: any) => {
            response.send('NoHai application.');
        });

        this.express.post('/login', async (req: any, res: any) => {
            await this.authController.login(req, res);
        });

        this.express.post('/refresh', async (req: any, res: any) => {
            await this.authController.refresh(req, res);
        });
    }

    protected abstract get listenLog(): string;
}
