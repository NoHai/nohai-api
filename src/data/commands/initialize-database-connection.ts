import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Nothing } from '../../business/models/nothing';
import { IDataSettings } from '../i-data-settings';
import { IInitializeDatabaseConnection } from './i-initialize-database-connection';

export class InitializeDatabaseConnection implements IInitializeDatabaseConnection {
    constructor(private readonly dataSettings: IDataSettings, private readonly createConnection: any) {
    }

    execute(): Observable<Nothing> {
        return of(new Nothing())
            .pipe(tap((_) => this.createConnection(this.dataSettings.typeorm)));
    }
}
