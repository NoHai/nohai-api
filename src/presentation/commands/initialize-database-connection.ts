import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {createConnection} from 'typeorm';
import {Nothing} from '../../business/models/nothing';
import {IInitializeDatabaseConnection} from './i-initialize-database-connection';

export class InitializeDatabaseConnection implements IInitializeDatabaseConnection {
    execute(): Observable<Nothing> {
        return of(new Nothing())
            .pipe(tap((_) => createConnection()));
    }
}
