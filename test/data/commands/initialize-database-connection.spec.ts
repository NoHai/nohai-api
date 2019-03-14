import { assert, reset, fake } from 'sinon';
import { IInitializeDatabaseConnection } from '../../../src/data/commands/i-initialize-database-connection';
import { InitializeDatabaseConnection } from '../../../src/data/commands/initialize-database-connection';
import { IDataSettings } from '../../../src/data/i-data-settings';

describe('initialize-database-connection', () => {
    const settings: IDataSettings = {typeorm: {}};
    const createConnection = fake((_: any) => _);

    let instance: IInitializeDatabaseConnection;

    beforeEach(() => {
        instance = new InitializeDatabaseConnection(settings, createConnection);
    });

    afterEach(() => {
        reset();
    });

    describe('execute', () => {
        beforeEach(async () => {
            return instance.execute().toPromise();
        });

        it('invokes createConnection with right parameter', async () => {
            assert.calledWith(createConnection, settings.typeorm);
        });
    });
});
