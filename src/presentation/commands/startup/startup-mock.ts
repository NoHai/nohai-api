import { CreateMockContainer } from '../ioc/create-mock-container';
import { StartupCommon } from './startup-common';

export class StartupMock extends StartupCommon {
    constructor() {
        super(new CreateMockContainer());
    }

    protected get listenLog(): string {
        return 'NoHai application started on mock environment.';
    }
}
