import { StartupCommon } from './startup-common';

export class StartupMock extends StartupCommon {
    protected get listenLog(): string {
        return 'NoHai application started on mock environment.';
    }
}
