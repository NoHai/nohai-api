import { createConnection as createMysqlConnection } from 'mysql';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Nothing } from '../../business/models/nothing';
import { IDataSettings } from '../i-data-settings';
import { ICreateDatabase } from './i-create-database';

export class CreateDatabase implements ICreateDatabase {
    constructor(private readonly dataSettings: IDataSettings) {
    }

    execute(): Observable<Nothing> {
        return of(`CREATE DATABASE IF NOT EXISTS ${this.dataSettings.typeorm.database}`)
            .pipe(switchMap((query) => this.executeQuery(query, this.buildConnection())));
    }

    private buildConnection(): any {
        return createMysqlConnection({
            host: this.dataSettings.typeorm.host,
            password: this.dataSettings.typeorm.password,
            user: this.dataSettings.typeorm.username,
        });
    }

    private executeQuery(queryString: string, connection: any): Observable<Nothing> {
        return Observable.create((observer: any) => {
            connection.query(queryString, (error: any) => {
                if (error) {
                    observer.error(error);
                }
                observer.next(new Nothing());
                connection.end();
                observer.complete();
            });
        });
    }
}
