import { IObservableCommand } from '../../../business/commands/core/i-observable-command';
import { Nothing } from '../../../business/models/nothing';

export interface IInitializeGraph extends IObservableCommand<Nothing, Nothing> {
}
