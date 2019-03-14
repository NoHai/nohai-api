import { AwilixContainer } from 'awilix';
import { CreateCommonContainer } from '../../../../src/presentation/commands/ioc/create-common-container';
import { CreateProductionContainer } from '../../../../src/presentation/commands/ioc/create-production-container';
import { stub, reset } from 'sinon';

describe('create-production-container', () => {
    process.env.environment = 'mock';
    const instance = new CreateProductionContainer();
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

        it('returns result returned by common execute', () => {
            expect(actual).toEqual(expected);
        });
    });
});
