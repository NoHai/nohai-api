import { createConnection as createMysqlConnection } from 'mysql';
import { Observable } from 'rxjs';
import { Nothing } from '../../src/business/models/nothing';

class Database1 {
    private connection: any = undefined;

    initialize(): void {
        this.connection = createMysqlConnection({
            host: this.allSettings().data.typeorm.host,
            password: this.allSettings().data.typeorm.password,
            user: this.allSettings().data.typeorm.username,
        });
    }

    async execute(query: string): Promise<any> {
        return this.executeQuery(query).toPromise();
    }

    private executeQuery(queryString: string): Observable<Nothing> {
        return Observable.create((observer: any) => {
            this.connection.query(queryString, (error: any) => {
                if (error) {
                    observer.error(error);
                }
                observer.next(new Nothing());
                observer.complete();
            });
        });
    }

    private allSettings(): any {
        return require(this.settingsPath());
    }

    private settingsPath(): string {
        return `../../src/presentation/settings/${process.env.environment}.json`;
    }
}

export const Database = new Database1();
