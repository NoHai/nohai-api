import { of } from 'rxjs';
import { assert, fake, reset, stub } from 'sinon';
import { ICreateDatabase } from '../../../../src/data/commands/i-create-database';
import { InitializeDatabaseConnection } from '../../../../src/data/commands/initialize-database-connection';
import { InitializeGraph } from '../../../../src/presentation/commands/graph/initialize-graph';
import { ResolveService } from '../../../../src/presentation/commands/ioc/resolve-service';
import { IStartup } from '../../../../src/presentation/commands/startup/i-startup';
import { StartupStaging } from '../../../../src/presentation/commands/startup/startup-staging';

describe('startup-staging', () => {
    process.env.environment = 'staging';

    const listen = fake((_: number, callback: any) => callback());
    const get = fake((_: string, callback: any) => callback({ }, { send }));
    const send = fake();
    const resolveService = stub(ResolveService.prototype, 'execute');
    const initializeDatabaseConnection = stub(InitializeDatabaseConnection.prototype, 'execute');
    const initializeGraph = stub(InitializeGraph.prototype, 'execute');
    const log = stub(console, 'log');

    let instance: IStartup;

    beforeEach(() => {
        const fakeCommand = { execute: fake() };
        setupResolveService('express', { listen, get });
        setupResolveService('initializeDatabaseConnection', new InitializeDatabaseConnection(
            { },
            { } as ICreateDatabase));
        setupResolveService('initializeGraph', new InitializeGraph(
                                                { use: fake() },
                                                fakeCommand,
                                                fakeCommand,
                                                fakeCommand,
                                                fakeCommand,
                                                fakeCommand,
                                                fakeCommand,
                                                fakeCommand));
        initializeDatabaseConnection.returns(of({ }));
        initializeGraph.returns(of({ }));
        instance = new StartupStaging();
    });

    afterEach(() => {
        reset();
    });

    describe('constructor', () => {
        it('express is initialized', () => {
            assert.calledWith(resolveService, 'express');
        });

        it('initializeDatabaseConnection is initialized', () => {
            assert.calledWith(resolveService, 'initializeDatabaseConnection');
        });
    });

    describe('execute', () => {
        beforeEach(async () => {
            return instance.execute().toPromise();
        });

        it('execute from initialize database connection is invoked', () => {
            assert.calledOnce(initializeDatabaseConnection);
        });

        it('execute from initialize graph is invoked', () => {
            assert.calledOnce(initializeGraph);
        });

        it('listen from express is invoked', () => {
            assert.calledWith(listen, 9999);
        });

        it('listen log is written', () => {
            assert.calledWith(log, 'NoHai application started on staging environment.');
        });

        it('get from server is invoked', () => {
            assert.calledOnce(get);
        });

        it('get response is written', () => {
            assert.calledWith(send, 'NoHai application.');
        });
    });

    const setupResolveService = (key: string, result: any) => {
        resolveService.withArgs(key).returns(result);
    };
});
