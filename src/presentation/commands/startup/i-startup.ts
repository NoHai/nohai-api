import {ICommand} from '../../../business/commands/core/i-command';
import {Nothing} from '../../../business/models/nothing';

export interface IStartup extends ICommand<Nothing, Nothing> {
}
