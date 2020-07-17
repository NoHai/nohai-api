import { IObservableCommand } from './core/i-observable-command';
import { UserDetailsInput } from '../models/inputs/user-details-input';
import { UserDetails } from '../../data/entities/user-details';
import { User } from '../models/results/user';

export interface ISaveUserDetails
  extends IObservableCommand<UserDetailsInput, User | undefined> { }
