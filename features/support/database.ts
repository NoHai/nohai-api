import { from } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { createConnection } from 'typeorm';

import { CreateDatabase } from '../../src/data/commands/create-database';

class DatabaseSupport {
    private connection: any;

    async initialize(): Promise<any> {
        return new CreateDatabase().execute()
            .pipe(switchMap(() => from(createConnection())))
            .pipe(tap((connection) => this.connection = connection))
            .toPromise();
    }

    async clean(): Promise<any> {
    }

    dispose(): void {
        this.connection.close();
    }
}

export const Database = new DatabaseSupport();
