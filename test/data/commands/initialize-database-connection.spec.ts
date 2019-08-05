import { of } from 'rxjs';
import { assert, createStubInstance, fake, reset } from 'sinon';
import { Nothing } from '../../../src/business/models/nothing';
import { CreateDatabase } from '../../../src/data/commands/create-database';
import { IInitializeDatabaseConnection } from '../../../src/data/commands/i-initialize-database-connection';
import { InitializeDatabaseConnection } from '../../../src/data/commands/initialize-database-connection';
import { IDataSettings } from '../../../src/data/i-data-settings';

describe('initialize-database-connection', () => {
    const settings: IDataSettings = { typeorm: { }};
    const createConnection = fake((_: any) => of(new Nothing()).toPromise());
    const createDatabase = createStubInstance(CreateDatabase, { execute: of(new Nothing()) });

    let instance: IInitializeDatabaseConnection;

    beforeEach(() => {
        reset();
        instance = new InitializeDatabaseConnection(createConnection, createDatabase);
    });

    describe('#execute', () => {
        beforeEach(async () => {
            return instance.execute().toPromise();
        });

        it('invokes #createDatabase', () => {
            assert.called(createDatabase.execute);
        });

        it('invokes #createConnection with right parameter', async () => {
            assert.calledWith(createConnection);
        });
    });
});
