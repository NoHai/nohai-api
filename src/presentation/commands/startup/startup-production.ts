import { StartupCommon } from './startup-common';

export class StartupProduction extends StartupCommon {
    protected get listenLog(): string {
        return 'NoHai application started on production environment.';
    }
}
