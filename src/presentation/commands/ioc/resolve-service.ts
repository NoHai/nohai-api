import {AwilixContainer} from 'awilix';
import {ICommand} from '../../../business/commands/core/i-command';

export class ResolveService implements ICommand<string | symbol, any> {
    constructor(private readonly container: AwilixContainer) {
    }

    execute(input?: string | symbol): any {
        return this.container.resolve(input as string);
    }
}
