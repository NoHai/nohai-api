import { AwilixContainer } from 'awilix';
import { CreateCommonContainer } from '../../../../src/presentation/commands/ioc/create-common-container';
import { CreateMockContainer } from '../../../../src/presentation/commands/ioc/create-mock-container';
import { stub, reset } from 'sinon';

describe('create-mock-container', () => {
    process.env.environment = 'mock';
    const instance = new CreateMockContainer();
    const commonExecute = stub(CreateCommonContainer.prototype, 'execute');
    const expected = {};

    beforeEach(() => {
        commonExecute.returns(expected as any);
    });

    afterEach(() => {
        reset();
    });

    describe('execute', () => {
        let actual: AwilixContainer;

        beforeEach(() => {
            actual = instance.execute();
        });

        it('returns result from common execute', () => {
            expect(actual).toEqual(expected);
        });
    });
});
