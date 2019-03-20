﻿import { InitializeDatabaseConnection } from '../../../../src/data/commands/initialize-database-connection';
import { reset, fake, stub, assert } from 'sinon';
import { IDataSettings } from '../../../../src/data/i-data-settings';
import { InitializeGraph } from '../../../../src/presentation/commands/graph/initialize-graph';
import { IStartup } from '../../../../src/presentation/commands/startup/i-startup';
import { StartupMock } from '../../../../src/presentation/commands/startup/startup-mock';
import { ResolveService } from '../../../../src/presentation/commands/ioc/resolve-service';
import { of } from 'rxjs';
import { IPresentationSettings } from '../../../../src/presentation/i-presentation-settings';

describe('startup-mock', () => {
    process.env.environment = 'mock';

    const listen = fake((_: number, callback: any) => callback());
    const get = fake((_: string, callback: any) => callback({}, {send}));
    const send = fake();
    const use = fake();
    const resolveService = stub(ResolveService.prototype, 'execute');
    const initializeDatabaseConnection = stub(InitializeDatabaseConnection.prototype, 'execute');
    const initializeGraph = stub(InitializeGraph.prototype, 'execute');
    const log = stub(console, 'log');

    let instance: IStartup;

    beforeEach(() => {
        setupResolveService('express', {listen, get, use});
        setupResolveService('presentationSettings', {port: 9999} as IPresentationSettings);
        setupResolveService('initializeDatabaseConnection', new InitializeDatabaseConnection({} as IDataSettings, {}));
        setupResolveService('initializeGraph', new InitializeGraph({use}));
        initializeDatabaseConnection.returns(of({}));
        initializeGraph.returns(of({}));
        instance = new StartupMock();
    });

    afterEach(() => {
        reset();
    });

    describe('constructor', () => {
        it('express is initialized', () => {
            assert.calledWith(resolveService, 'express');
        });

        it('presentationSettings is initialized', () => {
            assert.calledWith(resolveService, 'presentationSettings');
        });

        it('initializeDatabaseConnection is initialized', () => {
            assert.calledWith(resolveService, 'initializeDatabaseConnection');
        });

        it('initializeGraph is initialized', () => {
            assert.calledWith(resolveService, 'initializeGraph');
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
            assert.calledWith(log, 'NoHai application started on mock environment.');
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
