import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Nothing } from '../../business/models/nothing';
import { IDataSettings } from '../i-data-settings';
import { ICreateDatabase } from './i-create-database';
import { IInitializeDatabaseConnection } from './i-initialize-database-connection';

export class InitializeDatabaseConnection implements IInitializeDatabaseConnection {
    constructor(private readonly dataSettings: IDataSettings, private readonly createConnection: any,
                private readonly createDatabase: ICreateDatabase) {
    }

    execute(): Observable<Nothing> {
        return this.createDatabase.execute()
            .pipe(switchMap(() => from(this.createConnection(this.dataSettings.typeorm))))
            .pipe(map(() => new Nothing()));
    }
}
