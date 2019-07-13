import { CreateDevelopmentContainer } from '../ioc/create-development-container';
import { StartupCommon } from './startup-common';

export class StartupDevelopment extends StartupCommon {
    constructor() {
        super(new CreateDevelopmentContainer());
    }

    protected get listenLog(): string {
        return 'NoHai application started on dev environment.';
    }
}
