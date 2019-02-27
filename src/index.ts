import express from 'express';
import 'reflect-metadata';
import { tap } from 'rxjs/operators';
import { CreateContainer } from './presentation/commands/ioc/create-container';
import { ResolveService } from './presentation/commands/ioc/resolve-service';

const port: number = 5000;
const expressInstance = express();
const resolveService = new ResolveService(new CreateContainer().execute());

expressInstance.listen(port, async () => {
    resolveService.execute('initializeDatabaseConnection')
        .execute()
        .pipe(tap((_) => console.log('NoHai application started.')))
        .subscribe();
});

expressInstance.get('/', async (_, response: any) => {
    response.send('NoHai application.');
});
