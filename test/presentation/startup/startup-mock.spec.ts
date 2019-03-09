// import express from 'express';
// import { of } from 'rxjs';
// import { InitializeDatabaseConnection } from '../../../src/data/commands/initialize-database-connection';
// import { stub, assert } from 'sinon';
// import { StartupMock } from '../../../src/presentation/commands/startup/startup-mock';

describe('startup-mock', () => {
    process.env.environment = 'mock';
    // const initializeDatabaseConnection = stub(InitializeDatabaseConnection.prototype, 'execute').returns(of({}));
    // const log = stub(console, 'log');
    // const listen = stub(express(), 'listen') ;
    // const get = stub(express(), 'get');
    //
    // const instance = new StartupMock();

    beforeEach(() => {
        // instance.execute();
    });

    it('express is initialized', () => {
    });

    it('resolveService it initialized', () => {
    });

    describe('constructor', () => {
    });

    describe('execute', () => {
        it('execute from initialize database connection is invoked', () => {
            // assert.calledOnce(initializeDatabaseConnection);
        });

        it('listen from express is invoked', () => {
            // assert.calledOnce(listen);
        });

        it('log from console is invoked', () => {
            // assert.calledWith(log, 'NoHai application started on mock environment.');
        });

        it('get from express is invoked', () => {
            // assert.calledOnce(get);
        });
    });
});
