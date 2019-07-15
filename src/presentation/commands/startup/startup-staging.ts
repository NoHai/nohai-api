import { CreateStagingContainer } from '../ioc/create-staging-container';
import { StartupCommon } from './startup-common';

export class StartupStaging extends StartupCommon {
    constructor() {
        super(new CreateStagingContainer());
    }

    protected get listenLog(): string {
        return 'NoHai application started on staging environment.';
    }
}
