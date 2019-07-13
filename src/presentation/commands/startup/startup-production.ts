import { CreateProductionContainer } from '../ioc/create-production-container';
import { StartupCommon } from './startup-common';

export class StartupProduction extends StartupCommon {
    constructor() {
        super(new CreateProductionContainer());
    }

    protected get listenLog(): string {
        return 'NoHai application started on production environment.';
    }
}
