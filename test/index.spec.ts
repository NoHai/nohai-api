import { assert, stub, createStubInstance } from 'sinon';
import { StartupFactory } from '../src/presentation/commands/startup/startup-factory';
import { StartupMock } from '../src/presentation/commands/startup/startup-mock';

describe('index', () => {
    const startup = createStubInstance(StartupMock);
    const make = stub(StartupFactory.prototype, 'make').returns(startup);

    beforeAll(() => {
        require('../src/index');
    });

    it('make from StartupFactory is invoked', () => {
        assert.calledOnce(make);
    });

    it('execute from IStartup is invoked', () => {
        assert.calledOnce(startup.execute);
    });
});
