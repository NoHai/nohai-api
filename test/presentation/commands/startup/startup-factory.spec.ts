import { IStartup } from '../../../../src/presentation/commands/startup/i-startup';
import { StartupDevelopment } from '../../../../src/presentation/commands/startup/startup-development';
import { StartupFactory } from '../../../../src/presentation/commands/startup/startup-factory';
import { StartupMock } from '../../../../src/presentation/commands/startup/startup-mock';
import { StartupProduction } from '../../../../src/presentation/commands/startup/startup-production';
import { StartupStaging } from '../../../../src/presentation/commands/startup/startup-staging';

describe('startup-factory', () => {
    let instance: StartupFactory;

    beforeEach(function() {
        instance = new StartupFactory();
    });

    describe('make', () => {
        it('throws when environment is wrong', () => {
            process.env.environment = 'wrong';

            expect(instance.make).toThrow('Environment variable is wrong or it is not set.');
        });

        it('returns mock startup when environment is mock', () => {
            process.env.environment = 'mock';

            const actual: IStartup = instance.make();

            expect(actual).toBeInstanceOf(StartupMock);
        });

        it('returns development startup when environment is development', () => {
            process.env.environment = 'development';

            const actual: IStartup = instance.make();

            expect(actual).toBeInstanceOf(StartupDevelopment);
        });

        it('returns staging startup when environment is staging', () => {
            process.env.environment = 'staging';

            const actual: IStartup = instance.make();

            expect(actual).toBeInstanceOf(StartupStaging);
        });

        it('returns production startup when environment is production', () => {
            process.env.environment = 'production';

            const actual: IStartup = instance.make();

            expect(actual).toBeInstanceOf(StartupProduction);
        });
    });
});
