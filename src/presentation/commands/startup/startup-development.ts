import { StartupCommon } from './startup-common';

export class StartupDevelopment extends StartupCommon {
    protected get listenLog(): string {
        return 'NoHai application started on dev environment.';
    }
}
