import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Nothing } from '../../business/models/nothing';
import { ICreateDatabase } from './i-create-database';
import { IInitializeDatabaseConnection } from './i-initialize-database-connection';

export class InitializeDatabaseConnection implements IInitializeDatabaseConnection {
    constructor(private readonly createConnection: any,
                private readonly createDatabase: ICreateDatabase) {
    }

    execute(): Observable<Nothing> {
        return this.createDatabase.execute()
            .pipe(switchMap(() => from(this.createConnection())))
            .pipe(map(() => new Nothing()));
    }
}
