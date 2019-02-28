import { AwilixContainer } from 'awilix';
import { ICommand } from '../../../business/commands/core/i-command';
import { Nothing } from '../../../business/models/nothing';

export interface ICreateContainer extends ICommand<Nothing, AwilixContainer> {
}
