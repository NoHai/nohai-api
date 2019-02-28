import { IStartup } from './i-startup';
import { StartupDevelopment } from './startup-development';
import { StartupMock } from './startup-mock';
import { StartupProduction } from './startup-production';
import { StartupStaging } from './startup-staging';

export class StartupFactory {
    make(): IStartup {
        if (process.env.environment === 'mock') {
            return new StartupMock();
        }

        if (process.env.environment === 'development') {
            return new StartupDevelopment();
        }

        if (process.env.environment === 'staging') {
            return new StartupStaging();
        }

        if (process.env.environment === 'production') {
            return new StartupProduction();
        }

        throw new Error('Environment variable is wrong or it is not set.');
    }
}
