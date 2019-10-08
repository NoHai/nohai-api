import { createConnection as createMysqlConnection } from 'mysql';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Nothing } from '../../business/models/nothing';
import { ICreateDatabase } from './i-create-database';

export class CreateDatabase implements ICreateDatabase {

    execute(): Observable<Nothing> {
        return of(`CREATE DATABASE IF NOT EXISTS ${process.env.TYPEORM_DATABASE} DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci`)
            .pipe(switchMap((query) => this.executeQuery(query, this.buildConnection())));
    }

    private buildConnection(): any {
        return createMysqlConnection({
            host: process.env.TYPEORM_HOST,
            password: process.env.TYPEORM_PASSWORD,
            user: process.env.TYPEORM_USERNAME,
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
