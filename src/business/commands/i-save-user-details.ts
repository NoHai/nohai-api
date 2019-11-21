import { IObservableCommand } from './core/i-observable-command';
import { UserDetailsInput } from '../models/inputs/user-details-input';

export interface ISaveUserDetails extends IObservableCommand<UserDetailsInput, boolean> {

}
