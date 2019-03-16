import { StartupCommon } from './startup-common';

export class StartupStaging extends StartupCommon {
    protected get listenLog(): string {
        return 'NoHai application started on staging environment.';
    }
}
