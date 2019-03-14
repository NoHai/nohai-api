import { AwilixContainer } from 'awilix';
import { CreateCommonContainer } from '../../../src/presentation/commands/ioc/create-common-container';
import { CreateDevelopmentContainer } from '../../../src/presentation/commands/ioc/create-development-container';
import { stub, reset } from 'sinon';

describe('create-development-container', () => {
    process.env.environment = 'development';
    const instance = new CreateDevelopmentContainer();
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
