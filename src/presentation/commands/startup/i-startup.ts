import { IObservableCommand } from '../../../business/commands/core/i-observable-command';
import { Nothing } from '../../../business/models/nothing';

export interface IStartup extends IObservableCommand<Nothing, Nothing> {
}
