import { of } from 'rxjs';
import { assert, stub, createStubInstance, reset } from 'sinon';
import { StartupFactory } from '../src/presentation/commands/startup/startup-factory';
import { StartupMock } from '../src/presentation/commands/startup/startup-mock';

describe('index', () => {
    const startup = createStubInstance(StartupMock);
    const make = stub(StartupFactory.prototype, 'make').returns(startup);

    beforeEach(async () => {
        startup.execute.returns(of({}));
        return require('../src/index');
    });

    afterEach(() => {
        reset();
    });

    it('make from StartupFactory is invoked', () => {
        assert.calledOnce(make);
    });

    it('execute from IStartup is invoked', () => {
        assert.calledOnce(startup.execute);
    });
});
