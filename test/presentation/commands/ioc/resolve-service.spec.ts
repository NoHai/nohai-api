import { AwilixContainer } from 'awilix';
import { fake, assert } from 'sinon';
import { ResolveService } from '../../../../src/presentation/commands/ioc/resolve-service';

describe('resolve-service', () => {
    const expectedService: any = {};
    const resolve = fake(() => expectedService);
    const container: any = {resolve: resolve};
    const instance = new ResolveService(<AwilixContainer> container);

    describe('execute', () => {
        it('invokes resolve from AwilixContainer', () => {
            instance.execute('serviceName');

            assert.calledWith(resolve, 'serviceName');
        });

        it('returns service returned by container', () => {
            const actual: any = instance.execute();

            expect(actual).toEqual(expectedService);
        });
    });
});
